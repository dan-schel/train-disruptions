import React, { useEffect, useMemo, useRef } from "react";
import { Renderer } from "@/components/map/renderer/renderer";
import { Geometry } from "@/components/map/renderer/geometry";

// To debug geometry without needing to re-run the generator:
// import geometry from "@/scripts/generate-map-geometry/ptv";
import geometryJson from "@/components/map/geometry/ptv.json";
import { SerializedMapHighlighting } from "@/shared/types/map-data";

export type MapProps = {
  highlighting?: SerializedMapHighlighting;
};

export function Map(props: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const geometry = useMemo(() => Geometry.json.parse(geometryJson), []);

  console.log(props.highlighting);

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
      <canvas className="absolute top-0 left-0" ref={canvasRef} />
    </div>
  );
}
