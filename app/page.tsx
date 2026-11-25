import { caseStudies, demoUrl, evidenceQuestions, outcomes, scenarios } from './content';
import RelationshipMap from './relationship-map';
import SiteFooter from './site-footer';
import SiteHeader from './site-header';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title">Know your<br className="hero-break" /> software before<br className="hero-break" /> it becomes a risk.</h1>
              <p>Your organisation’s software holds years of business decisions, customer commitments, and hard-won knowledge. EQIP helps you see it clearly, so you can change it with confidence.</p>
              <div className="actions">
                <a href="#contact" className="button primary">Talk to an Expert</a>
                <a href="#evidence" className="button outline">Explore the Evidence</a>
              </div>
            </div>
            <RelationshipMap />
          </div>
          <div className="container hero-foot">
            <p>Software intelligence for organisations that cannot afford to guess.</p>
            <a href="#the-problem" className="text-link">Why it matters</a>
          </div>
        </section>

        <section id="the-problem" className="section paper problem" aria-labelledby="problem-title">
          <div className="container split">
            <h2 id="problem-title">Your software remembers more than your documentation does.</h2>
            <div className="section-copy">
              <p>Applications outlive their original teams. Systems connect in ways no diagram captures. Business rules sit in code, processes, and people’s memory.</p>
              <p>Then a transformation, migration, acquisition, or rapid release asks a simple question.</p>
              <p className="pull-question">What will this change affect?</p>
              <p>For too many organisations, the honest answer is that they don’t know yet.</p>
            </div>
          </div>
        </section>

        <section id="what-we-see" className="section visibility" aria-labelledby="visibility-title">
          <div className="container">
            <div className="split">
              <h2 id="visibility-title">Clarity before change.<br /> Confidence after it.</h2>
              <div className="section-copy">
                <p>EQIP brings together the evidence already distributed across your software estate. See how applications behave, where they depend on each other, which business rules matter, and where change creates risk.</p>
                <p>Leaders and delivery teams can use that evidence to make decisions under pressure.</p>
              </div>
            </div>
            <ol className="decision-flow" aria-label="From software evidence to a change decision">
              <li><strong>What exists</strong><span>Applications, rules, and records</span></li>
              <li><strong>What connects</strong><span>Dependencies and business journeys</span></li>
              <li><strong>What changes</strong><span>What is affected and what to verify</span></li>
            </ol>
          </div>
        </section>

        <section id="outcomes" className="section outcomes" aria-labelledby="outcomes-title">
          <div className="container outcomes-grid">
            <h2 id="outcomes-title">Four things EQIP makes possible.</h2>
            <ul className="outcome-list">
              {outcomes.map(({ name, title, description }) => (
                <li key={name}>
                  <h3>{name}</h3>
                  <div><strong>{title}</strong><p>{description}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="where-it-matters" className="section paper scenarios" aria-labelledby="scenarios-title">
          <div className="container">
            <h2 id="scenarios-title">When the cost of<br /> being wrong is high.</h2>
            <div className="scenario-grid">
              {scenarios.map(({ title, description, question }) => (
                <article key={title} className="scenario">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <p className="scenario-question">{question}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="evidence" className="section evidence" aria-labelledby="evidence-title">
          <div className="container">
            <div className="split evidence-intro">
              <div>
                <h2 id="evidence-title">Confidence should be visible.</h2>
                <p>EQIP helps teams trace what they know, what has changed, what they’ve validated, and what still needs attention.</p>
              </div>
              <dl className="evidence-list">
                {evidenceQuestions.map(({ label, question }) => (
                  <div key={label}><dt>{label}</dt><dd>{question}</dd></div>
                ))}
              </dl>
            </div>
            <div className="field-notes">
              <h3>Evidence from the field</h3>
              <div className="case-list">
                {caseStudies.map(({ title, challenge, clarity, outcome }) => (
                  <details className="case-study" key={title}>
                    <summary><span>{title}<small>Read the case study</small></span><span className="toggle-mark" aria-hidden="true" /></summary>
                    <dl>
                      <div><dt>The challenge</dt><dd>{challenge}</dd></div>
                      <div><dt>What became clear</dt><dd>{clarity}</dd></div>
                      <div><dt>What changed</dt><dd>{outcome}</dd></div>
                    </dl>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section enterprise" aria-labelledby="about-title">
          <div className="container split">
            <h2 id="about-title">Enterprise software is never just software.</h2>
            <div className="section-copy">
              <p>It’s a record of how an organisation operates. Customer exceptions, rules shaped by regulation, and workarounds that became essential all live inside it.</p>
              <p>EQIP brings software quality and assurance experience to complex estates, from legacy applications to environments with systems such as ServiceNow, Oracle, and SAP.</p>
              <a href="/technology/" className="text-link">How EQIP Works</a>
            </div>
          </div>
        </section>

        <section id="contact" className="section closing" aria-labelledby="contact-title">
          <div className="container closing-inner">
            <h2 id="contact-title">The next change should not depend on what someone happens to remember.</h2>
            <p>Bring the intelligence already inside your software into view. Understand what matters, preserve what works, and change with confidence.</p>
            <div className="actions">
              <a className="button primary" href={demoUrl}>Talk to an Expert</a>
              <a className="button outline" href="#where-it-matters">See EQIP in Context</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
