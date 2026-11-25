'use client';

import { useEffect, useRef, useState } from 'react';

export default function RevealHeading({ id, phrases, accentLast = false }: {
  id: string;
  phrases: string[];
  accentLast?: boolean;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const element = heading.current;
    if (!element || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setEntered(true);
      observer.disconnect();
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.18 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <h2 id={id} ref={heading} className="reveal-heading" data-entered={entered} data-accent={accentLast}>
      {phrases.map((phrase, index) => (
        <span className="reveal-line" key={phrase}>
          <span>{phrase}{index < phrases.length - 1 ? ' ' : ''}</span>
        </span>
      ))}
    </h2>
  );
}
