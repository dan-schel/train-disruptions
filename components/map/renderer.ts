import {
  BakedGeometry,
  BakedInterchange,
  BakedPoint,
  BakedTerminus,
} from "./baked-geometry";
import {
  interchangeBorderWidth,
  interchangeThickLineWidth,
  interchangeThinLineWidth,
  lineColors,
  lineWidth,
  terminusLineWidth,
} from "./utils";

// Canvas has `backingStorePixelRatio`, but Typescript doesn't know about it for
// some reason. (Probably the target "ES____" version we're using idk.)
declare global {
  interface CanvasRenderingContext2D {
    backingStorePixelRatio?: number;
  }
}

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
      this._renderLine(line.path, lineWidth, lineColors[line.color]);
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
      const line = interchange.thinLine;
      const width = interchangeThinLineWidth + 2 * interchangeBorderWidth;
      this._renderLine(line, width, "#45474d", "round");
    }
    for (const line of interchange.thickLines) {
      const width = interchangeThickLineWidth + 2 * interchangeBorderWidth;
      this._renderLine(line, width, "#45474d", "round");
    }

    // The white "fill".
    if (interchange.thinLine != null) {
      const line = interchange.thinLine;
      this._renderLine(line, interchangeThinLineWidth, "#ffffff", "round");
    }
    for (const line of interchange.thickLines) {
      this._renderLine(line, interchangeThickLineWidth, "#ffffff", "round");
    }
  }

  private _renderTerminus(terminus: BakedTerminus) {
    this._renderLine(
      [terminus.point1, terminus.point2],
      terminusLineWidth,
      lineColors[terminus.color],
    );
  }

  private _renderLine(
    points: readonly BakedPoint[],
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
