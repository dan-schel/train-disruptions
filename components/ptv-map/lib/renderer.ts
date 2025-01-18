import { BakedGeometry } from "./bake";
import { LineColor } from "./geometry";

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

  constructor(
    private readonly _canvas: HTMLCanvasElement,
    private _amplification: number,
    private _geometry: BakedGeometry,
  ) {
    const ctx = this._canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas not supported.");
    }
    this._ctx = ctx;
  }

  start() {
    this.render();
  }

  destroy() {}

  setAmplification(amplification: number) {
    this._amplification = amplification;
    this.render();
  }

  render() {
    const ctx = this._ctx;

    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    ctx.fillStyle = "#f0f0f0";
    ctx.rect(0, 0, this._canvas.width, this._canvas.height);
    ctx.fill();

    ctx.save();
    ctx.translate(this._canvas.width / 2, this._canvas.height / 2);
    ctx.scale(4, 4);

    for (const line of this._geometry.lineSegments) {
      ctx.lineCap = "butt";
      ctx.lineWidth = 4;
      ctx.strokeStyle = lineColors[line.color];
      ctx.beginPath();

      let firstPoint = true;

      for (const point of line.points) {
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

    for (const interchange of this._geometry.interchangeMarkers) {
      const { x: x1, y: y1 } = interchange.a.amplify(this._amplification);
      const { x: x2, y: y2 } = interchange.b.amplify(this._amplification);

      ctx.lineCap = "round";
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#45474d";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.lineCap = "round";
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    ctx.restore();
  }
}
