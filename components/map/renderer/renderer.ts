import { FlexiPoint } from "@/components/map/renderer/dimensions/flexi-point";
import { Geometry } from "@/components/map/renderer/geometry";
import { Interchange } from "@/components/map/renderer/interchange";
import { Segment } from "@/components/map/renderer/segment";
import {
  ghostLineColor,
  interchangeBorderWidth,
  interchangeFillColor,
  interchangeStrokeColor,
  interchangeThickLineWidth,
  interchangeThinLineWidth,
  lineColorCodes,
  lineWidth,
  terminusLineWidth,
  viewportPadding,
} from "@/components/map/renderer/utils";
import { SerializedMapHighlighting } from "@/shared/types/map-data";

// Canvas has `backingStorePixelRatio`, but Typescript doesn't know about it for
// some reason. (Probably the target "ES____" version we're using idk.)
declare global {
  interface CanvasRenderingContext2D {
    backingStorePixelRatio?: number;
  }
}

const minAmplificationWidth = 400;
const maxAmplificationWidth = 800;

export class Renderer {
  private readonly _ctx;

  private _width = 0;
  private _height = 0;
  private _dpiRatio = 1;
  private _amplification = 1;

  private _resizeListener: () => void;

  constructor(
    private readonly _canvasContainer: HTMLDivElement,
    private readonly _canvas: HTMLCanvasElement,
    private readonly _geometry: Geometry,
    private readonly _highlighting: SerializedMapHighlighting | null,
  ) {
    const ctx = this._canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas not supported.");
    }
    this._ctx = ctx;

    this._resizeListener = this._onResize.bind(this);
  }

  start() {
    this._fitCanvas();
    this._render();
    window.addEventListener("resize", this._resizeListener);
  }

  destroy() {
    window.removeEventListener("resize", this._resizeListener);
  }

  private _onResize() {
    this._fitCanvas();
    this._render();
  }

  private _fitCanvas() {
    const containerSize = this._canvasContainer.getBoundingClientRect();
    this._width = containerSize.width;
    this._height = containerSize.height;

    const dpr = window.devicePixelRatio ?? 1;
    const bsr = this._ctx.backingStorePixelRatio ?? 1;
    this._dpiRatio = (dpr / bsr) * 2;

    this._amplification = this._selectAmplification();

    this._canvas.style.width = `${this._width}px`;
    this._canvas.style.height = `${this._height}px`;
    this._canvas.width = this._width * this._dpiRatio;
    this._canvas.height = this._height * this._dpiRatio;
  }

  private _selectAmplification(): number {
    if (this._width > maxAmplificationWidth) {
      return 1;
    }
    if (this._width < minAmplificationWidth) {
      return 0;
    }
    return (
      (this._width - minAmplificationWidth) /
      (maxAmplificationWidth - minAmplificationWidth)
    );
  }

  private _render() {
    const ctx = this._ctx;
    ctx.save();

    const viewport = this._geometry.viewport.amplify(this._amplification);
    const scale = Math.min(
      this._width / (viewport.w + viewportPadding * 2),
      this._height / (viewport.h + viewportPadding * 2),
    );

    const pxWidth = this._width * this._dpiRatio;
    const pxHeight = this._height * this._dpiRatio;
    ctx.clearRect(0, 0, pxWidth, pxHeight);
    ctx.scale(this._dpiRatio, this._dpiRatio);
    ctx.translate(this._width / 2, this._height / 2);

    ctx.scale(scale, scale);
    ctx.translate(-viewport.x, -viewport.y);

    for (const segment of this._geometry.segments) {
      this._renderSegmentBottomLayer(segment);
    }

    for (const segment of this._geometry.segments) {
      this._renderSegmentTopLayer(segment);
    }

    for (const terminus of this._geometry.termini) {
      const color = lineColorCodes[terminus.color];
      this._renderPath(terminus.points, terminusLineWidth, color);
    }

    for (const interchange of this._geometry.interchanges) {
      this._renderInterchange(interchange);
    }

    ctx.restore();
  }

  private _renderInterchange(interchange: Interchange) {
    // The grey "border".
    if (interchange.thinLine != null) {
      const line = interchange.thinLine;
      const width = interchangeThinLineWidth + 2 * interchangeBorderWidth;
      this._renderPath(line, width, interchangeStrokeColor, "round");
    }
    for (const line of interchange.thickLines) {
      const width = interchangeThickLineWidth + 2 * interchangeBorderWidth;
      this._renderPath(line, width, interchangeStrokeColor, "round");
    }

    // The white "fill".
    if (interchange.thinLine != null) {
      const line = interchange.thinLine;
      const width = interchangeThinLineWidth;
      this._renderPath(line, width, interchangeFillColor, "round");
    }
    for (const line of interchange.thickLines) {
      const width = interchangeThickLineWidth;
      this._renderPath(line, width, interchangeFillColor, "round");
    }
  }

  private _renderSegmentBottomLayer(segment: Segment) {
    this._renderPath(segment.points, lineWidth, ghostLineColor);
  }

  private _renderSegmentTopLayer(segment: Segment) {
    const highlighting = this._getHighlightingForSegment(segment);
    if (highlighting == null) return;

    const color = lineColorCodes[segment.color];
    this._renderPath(
      segment.pointsForRange(
        this._amplification,
        highlighting.start,
        highlighting.end,
      ),
      lineWidth,
      color,
    );
  }

  private _renderPath(
    points: readonly FlexiPoint[],
    lineWidth: number,
    color: string,
    lineCap: CanvasLineCap = "butt",
  ) {
    const ctx = this._ctx;

    ctx.lineCap = lineCap;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.beginPath();

    let firstPoint = true;

    for (const point of points) {
      const { x, y } = point.amplify(this._amplification);

      if (firstPoint) {
        ctx.moveTo(x, y);
        firstPoint = false;
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
  }

  private _getHighlightingForSegment(segment: Segment) {
    return (
      this._highlighting?.segments.find(
        (x) =>
          x.nodeIdA === segment.startNodeId && x.nodeIdB === segment.endNodeId,
      ) ?? null
    );
  }
}
