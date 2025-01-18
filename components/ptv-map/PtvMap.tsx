import React, { useEffect, useRef } from "react";
import { Renderer } from "./lib/renderer";
import { ptvGeometry } from "./geometry/ptv-geometry";

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
      renderer = new Renderer(
        canvasRef.current,
        props.amplification,
        ptvGeometry,
      );
      renderer.start();
    }

    return () => {
      if (renderer != null) {
        renderer.destroy();
      }
    };
  }, [props.amplification]);

  return <canvas ref={canvasRef} width="1000" height="800" />;
}
