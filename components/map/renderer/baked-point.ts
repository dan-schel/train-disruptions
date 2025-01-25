import { parseFloatThrow } from "@dan-schel/js-utils";

export class BakedPoint {
  constructor(
    readonly minX: number,
    readonly minY: number,
    readonly maxX: number,
    readonly maxY: number,
  ) {}

  amplify(amplification: number) {
    return {
      x: this.minX + (this.maxX - this.minX) * amplification,
      y: this.minY + (this.maxY - this.minY) * amplification,
    };
  }

  toString() {
    const minX = this.minX.toFixed(2);
    const minY = this.minY.toFixed(2);
    const maxX = this.maxX.toFixed(2);
    const maxY = this.maxY.toFixed(2);
    return `${minX} ${minY} ${maxX} ${maxY}`;
  }

  static fromString(s: string) {
    if (!/^\d\.\d\d \d\.\d\d \d\.\d\d \d\.\d\d$/.test(s)) {
      throw new Error("Invalid BakedPoint string.");
    }
    const [minX, minY, maxX, maxY] = s
      .split(" ")
      .map((n) => parseFloatThrow(n));
    return new BakedPoint(minX, minY, maxX, maxY);
  }
}
