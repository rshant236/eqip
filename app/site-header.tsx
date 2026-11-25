'use client';

import { useRef } from 'react';
import { navigation } from './content';

export default function SiteHeader() {
  const menu = useRef<HTMLDetailsElement>(null);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="/" className="wordmark" aria-label="EQIP home">
          {/* The approved wordmark is extracted from the supplied brand guide. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/eqip-wordmark.png" alt="EQIP" width="88" height="21" />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
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
              <a key={href} href={href} onClick={() => { if (menu.current) menu.current.open = false; }}>{label}</a>
            ))}
            <a href="/#contact" onClick={() => { if (menu.current) menu.current.open = false; }}>Talk to an Expert</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
