"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DRAG_THRESHOLD = 6;

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const state = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
    moved: false,
  });

  const onPointerDown = useCallback((event: React.PointerEvent<T>) => {
    if (event.button !== 0) return;
    const element = ref.current;
    if (!element) return;

    state.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
      moved: false,
    };
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handlePointerMove = (event: PointerEvent) => {
      const current = state.current;
      if (current.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - current.startX;
      const deltaY = event.clientY - current.startY;

      if (!current.moved && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) {
        return;
      }

      if (!current.moved) {
        current.moved = true;
        setIsDragging(true);
        element.setPointerCapture(event.pointerId);
      }

      element.scrollLeft = current.scrollLeft - deltaX;
      element.scrollTop = current.scrollTop - deltaY;
    };

    const endDrag = (event: PointerEvent) => {
      const current = state.current;
      if (current.pointerId !== event.pointerId) return;
      current.pointerId = -1;
      if (current.moved) setIsDragging(false);
    };

    const handleClickCapture = (event: MouseEvent) => {
      if (!state.current.moved) return;
      state.current.moved = false;
      event.preventDefault();
      event.stopPropagation();
    };

    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerup", endDrag);
    element.addEventListener("pointercancel", endDrag);
    element.addEventListener("click", handleClickCapture, true);

    return () => {
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerup", endDrag);
      element.removeEventListener("pointercancel", endDrag);
      element.removeEventListener("click", handleClickCapture, true);
    };
  }, []);

  return { ref, isDragging, onPointerDown };
}
