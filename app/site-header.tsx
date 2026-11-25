'use client';

import { useEffect, useRef, useState } from 'react';
import { navigation } from './content';

export default function SiteHeader() {
  const menu = useRef<HTMLDetailsElement>(null);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main > section');
    const observer = new IntersectionObserver((entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (!current) return;
      const section = current.target as HTMLElement;
      setActiveLink(`/#${section.dataset.navSection ?? section.id}`);
    }, { rootMargin: '-18% 0px -78% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="/" className="wordmark" aria-label="EQIP home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/eqip-logo.png" alt="EQIP Intelligent QA" width="195" height="139" />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(({ label, href }) => <a key={href} href={href} aria-current={href === activeLink ? 'location' : undefined}>{label}</a>)}
        </nav>
        <a className="button header-cta" href="/#contact">Talk to an Expert</a>
        <details
          className="mobile-menu"
          ref={menu}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && menu.current?.open) {
              menu.current.open = false;
              menu.current.querySelector('summary')?.focus();
            }
          }}
        >
          <summary>Menu <span className="menu-icon" aria-hidden="true" /></summary>
          <nav aria-label="Mobile navigation">
            {navigation.map(({ label, href }) => (
              <a key={href} href={href} aria-current={href === activeLink ? 'location' : undefined} onClick={() => { if (menu.current) menu.current.open = false; }}>{label}</a>
            ))}
            <a href="/#contact" onClick={() => { if (menu.current) menu.current.open = false; }}>Talk to an Expert</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
