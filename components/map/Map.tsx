import React, { useEffect, useRef } from "react";
import { Renderer } from "./renderer";

// TODO: [DS] Use the pre-generated geometry, rather than generating it here.
import { geometry } from "../../scripts/generate-map-geometry/ptv";

export function Map() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (containerRef.current == null || canvasRef.current == null) {
      return;
    }

    const renderer = new Renderer(
      containerRef.current,
      canvasRef.current,
      geometry,
    );

    renderer.start();

    return () => {
      if (renderer != null) {
        renderer.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-video overflow-hidden border border-gray-300"
    >
      <canvas
        className="absolute left-0 top-0"
        ref={canvasRef}
        width="1000"
        height="800"
      />
    </div>
  );
}
