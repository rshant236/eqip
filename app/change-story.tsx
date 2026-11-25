'use client';

import { useEffect, useRef, useState } from 'react';
import RelationshipMap from './relationship-map';

const chapters = [
  {
    title: 'What exists',
    subject: 'Applications, rules, and records',
    detail: 'Start with the ERP, the orders it receives, and the customer history that explains how it treats different agreements.',
  },
  {
    title: 'What connects',
    subject: 'Dependencies and business journeys',
    detail: 'Follow a proposed pricing change from the ERP through the pricing rules to the invoice a customer receives.',
  },
  {
    title: 'What changes',
    subject: 'What is affected and what to verify',
    detail: 'Check standard invoices against expected charges, then review the contract exceptions that may behave differently.',
  },
];

export default function ChangeStory() {
  const chaptersRef = useRef<HTMLOListElement>(null);
  const [position, setPosition] = useState({ chapter: 0, revision: 0 });

  useEffect(() => {
    const steps = [...(chaptersRef.current?.querySelectorAll('li') ?? [])];
    const layout = window.matchMedia('(min-width: 65.01rem) and (min-height: 45rem) and (prefers-reduced-motion: no-preference)');
    let frame = 0;

    function follow() {
      frame = 0;
      const marker = window.innerHeight * 0.53;
      const current = layout.matches ? steps.findLastIndex((step) => step.getBoundingClientRect().top <= marker) : 0;
      const chapter = Math.max(current, 0);
      setPosition((previous) => previous.chapter === chapter ? previous : { chapter, revision: previous.revision + 1 });
    }

    function schedule() {
      if (!frame && layout.matches) frame = requestAnimationFrame(follow);
    }

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    layout.addEventListener('change', follow);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      layout.removeEventListener('change', follow);
    };
  }, []);

  return (
    <div className="change-story">
      <ol className="story-chapters" aria-label="From software evidence to a change decision" ref={chaptersRef}>
        {chapters.map(({ title, subject, detail }, index) => (
          <li key={title} data-current={position.chapter === index}>
            <div>
              <h3>{title}</h3>
              <p className="story-subject">{subject}</p>
              <p className="story-detail">{detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="story-board">
        <RelationshipMap chapter={position.chapter} revision={position.revision} />
      </div>
    </div>
  );
}
