import React, { useEffect, useMemo, useRef } from "react";
import { Renderer } from "./renderer/renderer";
import { BakedGeometry } from "./renderer/baked-geometry";

// To debug geometry without needing to re-run the generator:
// import geometry from "../../scripts/generate-map-geometry/ptv";
import geometryJson from "./geometry/ptv.json";

export function Map() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const geometry = useMemo(() => BakedGeometry.json.parse(geometryJson), []);

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
  }, [geometry]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden border border-gray-300"
      style={{ aspectRatio: geometry.suggestedAspectRatio().toFixed(2) }}
    >
      <canvas className="absolute left-0 top-0" ref={canvasRef} />
    </div>
  );
}
