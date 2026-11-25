import { caseStudies, demoUrl, evidenceQuestions, outcomes, scenarios } from './content';
import ChangeStory from './change-story';
import EstateScene from './estate-scene';
import SiteFooter from './site-footer';
import SiteHeader from './site-header';
import './homepage.css';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="homepage">
        <section className="hero" aria-labelledby="hero-title">
          <EstateScene />
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title"><span className="hero-phrase">Know your</span><br className="hero-break" /> <span className="hero-phrase">software before</span><br className="hero-break" /> <span className="hero-phrase">it becomes a risk.</span></h1>
              <p>Your organisation’s software holds years of business decisions, customer commitments, rules, and hard-won knowledge. EQIP helps you see it clearly—so you can modernise, change, validate, and move forward with confidence.</p>
              <div className="actions">
                <a href="#contact" className="button primary">Talk to an Expert</a>
                <a href="#evidence" className="button outline">Explore the Evidence</a>
              </div>
            </div>
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
              <p>Across every enterprise are applications that have outlived their original teams, systems connected in ways no diagram captures, and business rules buried in code, processes, and people’s memory.</p>
              <p>That is manageable—until a transformation, migration, acquisition, or rapid release asks a simple question:</p>
              <p className="pull-question">What will this change affect?</p>
              <p>For too many organisations, the honest answer is: we do not know yet.</p>
              <a className="text-link trace-link" href="#what-we-see">Trace a change</a>
            </div>
          </div>
        </section>

        <section id="what-we-see" className="section visibility" aria-labelledby="visibility-title">
          <div className="container">
            <div className="split">
              <h2 id="visibility-title">Clarity before change.<br /> Confidence after it.</h2>
              <div className="section-copy">
                <p>EQIP brings together the evidence already distributed across your software estate: how applications behave, where dependencies sit, what business rules matter, and where change creates risk.</p>
                <p>It gives leaders and delivery teams a clearer basis for decisions that are usually made under pressure.</p>
              </div>
            </div>
            <ChangeStory />
            <ul id="outcomes" className="outcome-list" aria-label="What EQIP makes visible">
              {outcomes.map(({ title, description }) => (
                <li key={title}>
                  <h3>{title}</h3><p>{description}</p>
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
                <p>EQIP does not ask teams to rely on a black box or a reassuring dashboard. It helps create a traceable view of what is known, what has changed, what has been validated, and where attention is still needed.</p>
                <a className="text-link field-link" href="#field-evidence">Evidence from the field</a>
              </div>
              <div>
                <p className="evidence-lead">The result is a conversation grounded in evidence:</p>
                <dl className="evidence-list">
                  {evidenceQuestions.map(({ label, question }) => (
                    <div key={label}><dt>{label}</dt><dd>{question}</dd></div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section enterprise" aria-labelledby="about-title">
          <div className="container split">
            <h2 id="about-title">Enterprise software is never just software.</h2>
            <div className="section-copy">
              <p>It is the accumulated record of how an organisation operates: exceptions made for customers, rules shaped by regulation, decisions taken during growth, and workarounds that became essential.</p>
              <p>EQIP is built for that reality. We combine deep quality and software assurance experience with a modern intelligence layer designed for estates that are complex, consequential, and constantly changing.</p>
              <a href="/technology/" className="text-link">How EQIP Works</a>
            </div>
          </div>
        </section>

        <section id="field-evidence" className="section paper field-notes" aria-labelledby="field-title">
          <div className="container split">
            <h2 id="field-title">The work speaks for itself.</h2>
            <div className="case-list">
              {caseStudies.map(({ title, challenge, clarity, outcome }) => (
                <details className="case-study" key={title}>
                  <summary>
                    <span>{title}<small><span className="open-label">Read the case study</span><span className="close-label">Close the case study</span></small></span>
                    <span className="toggle-mark" aria-hidden="true" />
                  </summary>
                  <dl>
                    <div><dt>The challenge</dt><dd>{challenge}</dd></div>
                    <div><dt>What became clear</dt><dd>{clarity}</dd></div>
                    <div><dt>What changed</dt><dd>{outcome}</dd></div>
                  </dl>
                </details>
              ))}
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
