'use client';

import { useEffect, useState, type ReactNode } from 'react';

const compactLayout = '(max-width: 24rem) and (max-height: 43rem), (max-height: 28rem)';

export default function ResponsiveDisclosure({ label, children, heading = false }: {
  label: string;
  children: ReactNode;
  heading?: boolean;
}) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const layout = window.matchMedia(compactLayout);
    const update = () => setCompact(layout.matches);
    update();
    layout.addEventListener('change', update);
    return () => layout.removeEventListener('change', update);
  }, []);

  if (!compact) {
    return heading ? <div className="outcome"><h3>{label}</h3>{children}</div> : <>{children}</>;
  }

  return (
    <details className={heading ? 'responsive-disclosure outcome' : 'responsive-disclosure'}>
      <summary><span>{label}</span><span className="toggle-mark" aria-hidden="true" /></summary>
      <div className="disclosure-copy">{children}</div>
    </details>
  );
}
