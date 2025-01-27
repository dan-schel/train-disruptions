import React, { useEffect, useMemo, useRef } from "react";
import { Renderer } from "./renderer/renderer";
import { Geometry } from "./renderer/geometry";

// To debug geometry without needing to re-run the generator:
// import geometry from "../../scripts/generate-map-geometry/example";
import geometryJson from "./geometry/example.json";

export function Map() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const geometry = useMemo(() => Geometry.json.parse(geometryJson), []);

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
      className="relative overflow-hidden"
      style={{ aspectRatio: geometry.suggestedAspectRatio().toFixed(2) }}
    >
      <canvas className="absolute left-0 top-0" ref={canvasRef} />
    </div>
  );
}
