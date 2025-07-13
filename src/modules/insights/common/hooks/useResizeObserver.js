import { useEffect, useRef, useState } from "react";

export const useResizeObserver = (items = [], gap = 5) => {
  const containerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(items.length);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !items.length) {
      setVisibleCount(items.length);
      return;
    }

    const calculateVisibleCount = () => {
      try {
        const containerWidth = container.offsetWidth;
        const children = Array.from(container.children);

        let count = 0;
        let used = 0;

        for (let i = 0; i < children.length; i++) {
          const childWidth = children[i].offsetWidth;
          if (used + childWidth > containerWidth) break;
          used += childWidth + gap;
          count++;
        }

        setVisibleCount(count);
      } catch (error) {
        console.error("Error calculating visible count:", error);
        setVisibleCount(items.length);
      }
    };

    const observer = new ResizeObserver(calculateVisibleCount);
    observer.observe(container);

    // Initial calculation
    calculateVisibleCount();

    return () => observer.disconnect();
  }, [items, gap]);

  return { containerRef, visibleCount, showAll: visibleCount >= items.length };
};
