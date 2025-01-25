import {
  BakedGeometry,
  BakedInterchange,
  BakedTerminus,
} from "./baked/baked-geometry";
import { FlexiPoint } from "./dimensions/flexi-point";
import { LineColor } from "./line";

// Canvas has `backingStorePixelRatio`, but Typescript doesn't know about it for
// some reason. (Probably the target "ES____" version we're using idk.)
declare global {
  interface CanvasRenderingContext2D {
    backingStorePixelRatio?: number;
  }
}

const lineColors: Record<LineColor, string> = {
  red: "#e42b23",
  yellow: "#ffb531",
  green: "#159943",
  cyan: "#16b4e8",
  blue: "#094c8d",
  purple: "#6c3b9f",
  pink: "#fc7fbb",
  grey: "#9b9c9f",
};

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
    private _geometry: BakedGeometry,
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
    this._dpiRatio = dpr / bsr;

    this._amplification = 1;

    this._canvas.style.width = `${this._width}px`;
    this._canvas.style.height = `${this._height}px`;
    this._canvas.width = this._width * this._dpiRatio;
    this._canvas.height = this._height * this._dpiRatio;
  }

  private _render() {
    const ctx = this._ctx;
    ctx.save();

    const pxWidth = this._width * this._dpiRatio;
    const pxHeight = this._height * this._dpiRatio;
    ctx.clearRect(0, 0, pxWidth, pxHeight);
    ctx.scale(this._dpiRatio, this._dpiRatio);
    ctx.translate(this._width / 2, this._height / 2);

    // <temp>
    ctx.scale(1, 1);
    // </temp>

    for (const line of this._geometry.lines) {
      this._renderLine(line.path, 4, lineColors[line.color]);
    }

    for (const terminus of this._geometry.terminii) {
      this._renderTerminus(terminus);
    }

    for (const interchange of this._geometry.interchanges) {
      this._renderInterchange(interchange);
    }

    ctx.restore();
  }

  private _renderInterchange(interchange: BakedInterchange) {
    // The grey "border".
    if (interchange.thinLine != null) {
      this._renderLine(interchange.thinLine, 3, "#45474d", "round");
    }
    for (const line of interchange.thickLines) {
      this._renderLine(line, 6, "#45474d", "round");
    }

    // The white "fill".
    if (interchange.thinLine != null) {
      this._renderLine(interchange.thinLine, 1, "#ffffff", "round");
    }
    for (const line of interchange.thickLines) {
      this._renderLine(line, 4, "#ffffff", "round");
    }
  }

  private _renderTerminus(terminus: BakedTerminus) {
    const ctx = this._ctx;

    const center = terminus.point.amplify(this._amplification);
    const angle = terminus.angle;
    const { x: x1, y: y1 } = center.move(5, angle - 90);
    const { x: x2, y: y2 } = center.move(5, angle + 90);

    ctx.lineCap = "butt";
    ctx.lineWidth = 3;
    ctx.strokeStyle = lineColors[terminus.color];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  private _renderLine(
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
}
