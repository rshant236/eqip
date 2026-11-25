import { navigation } from './content';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <a href="/" className="wordmark" aria-label="EQIP home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/eqip-wordmark.png" alt="EQIP" width="88" height="21" loading="lazy" />
          </a>
          <p>EQIP helps organisations understand, preserve, validate, and continuously evolve their software with confidence.</p>
        </div>
        <nav aria-label="Footer navigation">
          {navigation.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
          <a href="/technology/">How EQIP Works</a>
        </nav>
      </div>
    </footer>
  );
}
