import { BakedGeometry, BakedPoint } from "./bake";

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

    for (const interchange of this._geometry.interchangeMarkers) {
      const { x: x1, y: y1 } = amplify(interchange.a, this._amplification);
      const { x: x2, y: y2 } = amplify(interchange.b, this._amplification);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    for (const line of this._geometry.lineSegments) {
      ctx.lineWidth = 4;
      ctx.strokeStyle = line.color;
      ctx.beginPath();

      let firstPoint = true;

      for (const point of line.points) {
        const { x, y } = amplify(point, this._amplification);

        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
    }

    ctx.restore();
  }
}

function amplifyValue(min: number, max: number, amplification: number) {
  return min + (max - min) * amplification;
}

export function amplify(point: BakedPoint, amplification: number) {
  return {
    x: amplifyValue(point.min.x, point.max.x, amplification),
    y: amplifyValue(point.min.y, point.max.y, amplification),
  };
}
