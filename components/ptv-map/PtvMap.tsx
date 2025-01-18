import React, { useEffect, useRef, MouseEvent } from "react";
import { Renderer } from "./lib/renderer";
import { geometry } from "./geometry";

export type PtvMapProps = {
  /** How much to exaggerate details (optimise for smaller screens.) */
  amplification: number;
};

export function PtvMap(props: PtvMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // TODO [DS]: Let's not recreate the renderer every time the amplification
  // changes. It will change with the screen size, so often while resizing.
  useEffect(() => {
    let renderer: Renderer | null = null;
    if (canvasRef.current != null) {
      renderer = new Renderer(canvasRef.current, props.amplification, geometry);
      renderer.start();
    }

    return () => {
      if (renderer != null) {
        renderer.destroy();
      }
    };
  }, [props.amplification]);

  function handleClick(e: MouseEvent) {
    const x = (e.nativeEvent.offsetX - 500) / 4;
    const y = (e.nativeEvent.offsetY - 400) / 4;
    console.log(`Clicked at x=${x.toFixed()}, y=${y.toFixed()}`);
  }

  return (
    <canvas ref={canvasRef} width="1000" height="800" onClick={handleClick} />
  );
}
