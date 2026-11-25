import type { Metadata } from 'next';
import { architecture, demoUrl } from '../content';
import SiteFooter from '../site-footer';
import SiteHeader from '../site-header';

export const metadata: Metadata = {
  title: 'How EQIP Works',
  description: 'Explore how EQIP connects software knowledge, verifies behaviour, and traces the evidence behind release decisions.',
};

export default function Technology() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="section technology-hero" aria-labelledby="technology-title">
          <div className="container">
            <a className="text-link" href="/">EQIP Home</a>
            <h1 id="technology-title">How EQIP works.</h1>
            <p>EQIP connects what your software does with what your teams know, so the evidence behind a change can be traced and used again.</p>
          </div>
        </section>
        <section className="section paper technology-body" aria-labelledby="architecture-title">
          <div className="container split">
            <div>
              <h2 id="architecture-title">From software to decision.</h2>
              <p>This conceptual view shows how the capabilities fit together.</p>
            </div>
            <ol className="architecture-list">
              {architecture.map(({ title, description, terms }) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ul aria-label="Related capabilities">
                    {terms.map((term) => <li key={term}>{term}</li>)}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="section closing" aria-labelledby="technology-contact">
          <div className="container closing-inner">
            <h2 id="technology-contact">Put your next change in context.</h2>
            <p>Discuss your software estate, the work you’re planning, and what your team needs to verify.</p>
            <div className="actions"><a className="button primary" href={demoUrl}>Talk to an Expert</a></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
