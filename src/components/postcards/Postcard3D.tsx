import React, { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Postcard3DProps = {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  orientation?: "landscape" | "portrait";
  initialTilt?: { x: number; y: number };
  maxTilt?: { x: number; y: number };
};

export function Postcard3D({
  front,
  back,
  className,
  orientation = "landscape",
  initialTilt = { x: -2, y: 8 },
  maxTilt = { x: 15, y: 20 },
}: Postcard3DProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState<{ x: number; y: number }>(initialTilt);
  const [drag, setDrag] = useState<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);
  const [flipped, setFlipped] = useState(false);

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    setDrag({ startX: e.clientX, startY: e.clientY, baseX: rot.x, baseY: rot.y });
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    const nextX = clamp(drag.baseX - dy * 0.15, -maxTilt.x, maxTilt.x);
    const nextY = clamp(drag.baseY + dx * 0.2, -maxTilt.y, maxTilt.y);
    setRot({ x: nextX, y: nextY });
  };

  const endDrag = useCallback(() => setDrag(null), []);

  const reset = () => {
    setRot(initialTilt);
    setFlipped(false);
  };

  const flip = () => setFlipped((f) => !f);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "f") flip();
    if (e.key === "r") reset();
    if (e.key === "ArrowLeft") setRot((r) => ({ ...r, y: clamp(r.y - 4, -maxTilt.y, maxTilt.y) }));
    if (e.key === "ArrowRight") setRot((r) => ({ ...r, y: clamp(r.y + 4, -maxTilt.y, maxTilt.y) }));
    if (e.key === "ArrowUp") setRot((r) => ({ ...r, x: clamp(r.x - 3, -maxTilt.x, maxTilt.x) }));
    if (e.key === "ArrowDown") setRot((r) => ({ ...r, x: clamp(r.x + 3, -maxTilt.x, maxTilt.x) }));
  };

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative w-full rounded-xl",
        orientation === "portrait" ? "aspect-[105/148]" : "aspect-[148/105]",
        "[perspective:1200px]",
        "select-none touch-none group",
        className
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      onDoubleClick={flip}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label="Інтерактивна листівка, перетягніть для обертання, 'f' — перевернути, 'r' — скинути"
    >
      <div
        className={cn(
          "absolute inset-0 rounded-xl",
          "[transform-style:preserve-3d]",
          "transition-transform duration-150 ease-out"
        )}
        style={{
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y + (flipped ? 180 : 0)}deg)`,
        }}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-xl overflow-hidden [backface-visibility:hidden]">
          {front}
        </div>

        {/* Back */}
        <div className="absolute inset-0 rounded-xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
          {back}
        </div>

        {/* Тонкая «толщина» + подсветка */}
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-primary/40 shadow-soft" />
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-[radial-gradient(100%_100%_at_30%_0%,rgba(255,255,255,0.6)_0%,transparent_60%)]" />
      </div>

      {/* Controls */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white rounded-full" onClick={flip} aria-label="Перевернути">
          <RefreshCcw className="h-4 w-4 text-primary" />
        </Button>
        <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white rounded-full" onClick={reset} aria-label="Скинути">
          <RotateCcw className="h-4 w-4 text-primary" />
        </Button>
      </div>
    </div>
  );
}