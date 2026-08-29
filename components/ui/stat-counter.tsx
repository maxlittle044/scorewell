"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1200;

export function StatCounter({ value }: { value: string }) {
  const match = value.match(/^([\d,]+)(.*)$/);
  const target = match ? Number(match[1].replace(/,/g, "")) : null;
  const suffix = match ? match[2] : "";

  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          const eased = 1 - (1 - progress) ** 3;
          setCount(Math.floor(eased * target!));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(target!);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  if (target === null) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
