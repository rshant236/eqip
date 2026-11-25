'use client';

import { useEffect, useId, useRef, useState } from 'react';

const nodes = [
  { id: 'orders', label: 'Order entry', x: 17, y: 23, description: 'Customer orders carry the requested price and billing terms into the ERP.' },
  { id: 'erp', label: 'ERP system', x: 17, y: 50, description: 'The proposed change starts in the ERP, where prices are calculated and orders are processed.' },
  { id: 'history', label: 'Customer history', x: 17, y: 77, description: 'Older customer agreements can explain why an order is priced differently.' },
  { id: 'pricing', label: 'Pricing rules', x: 50, y: 23, description: 'The proposed change affects how prices are calculated and passed on to billing.' },
  { id: 'exceptions', label: 'Contract terms', x: 50, y: 50, description: 'Some customers qualify for pricing exceptions under existing agreements.' },
  { id: 'tax', label: 'Tax rules', x: 50, y: 77, description: 'Tax calculation uses line prices from the ERP before invoices are issued.' },
  { id: 'fulfilment', label: 'Fulfilment', x: 83, y: 23, description: 'Fulfilment relies on confirmed orders to tell operations what to deliver.' },
  { id: 'billing', label: 'Billing', x: 83, y: 50, description: 'Compare invoices against expected prices before release. Some contract exceptions still need review.' },
  { id: 'reporting', label: 'Finance reports', x: 83, y: 77, description: 'Finance reports use posted invoices to reconcile the period’s revenue.' },
] as const;

type NodeId = typeof nodes[number]['id'];

const links: ReadonlyArray<readonly [NodeId, NodeId]> = [
  ['orders', 'exceptions'], ['orders', 'pricing'], ['erp', 'pricing'],
  ['erp', 'tax'], ['history', 'tax'], ['exceptions', 'fulfilment'],
  ['exceptions', 'billing'], ['pricing', 'billing'], ['tax', 'billing'],
  ['tax', 'reporting'],
];

const byId = new Map(nodes.map((node) => [node.id, node]));
const connections = links.map(([from, to]) => {
  const start = byId.get(from)!;
  const end = byId.get(to)!;
  const bend = (start.x + end.x) / 2 + (end.y < start.y ? -1 : 1);
  const path = `M ${start.x + 12} ${start.y} H ${bend} V ${end.y} H ${end.x - 12}`;
  return { from, to, path, delay: start.x === 17 ? 120 : 820 };
});

const views: ReadonlyArray<{
  label: string;
  active: readonly NodeId[];
  title: string;
  description: string;
}> = [
  {
    label: 'System view',
    active: [],
    title: 'See how the estate fits together',
    description: 'Select a system, rule, or business journey to see what it does in this example.',
  },
  {
    label: 'Change impact',
    active: ['erp', 'pricing', 'billing'],
    title: 'A pricing change reaches billing',
    description: 'A rule changed in the ERP can change what a customer is charged downstream.',
  },
  {
    label: 'Evidence',
    active: ['orders', 'exceptions', 'billing'],
    title: 'Know what still needs a check',
    description: 'Standard invoices can be compared with expected prices. Contract exceptions still need review.',
  },
];

export default function RelationshipMap({ chapter, revision }: { chapter: number; revision: number }) {
  const [interaction, setInteraction] = useState<{ revision: number; view: number; node: NodeId | null } | null>(null);
  const [replay, setReplay] = useState(0);
  const [entered, setEntered] = useState(false);
  const board = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!board.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(board.current);
    return () => observer.disconnect();
  }, []);
  const patternId = useId();
  const current = interaction?.revision === revision ? interaction : null;
  const viewIndex = current?.view ?? chapter;
  const selected = current?.node ?? null;
  const view = views[viewIndex];
  const activeNode = nodes.find((node) => node.id === selected);
  const traceKey = `${viewIndex}-${selected ?? 'overview'}-${replay}`;
  const activeLinks = connections.filter(({ from, to }) => selected
    ? from === selected || to === selected
    : view.active.includes(from) && view.active.includes(to));
  const connected = selected
    ? [
        selected,
        ...connections.filter(({ from }) => from === selected).map(({ to }) => to),
        ...connections.filter(({ to }) => to === selected).map(({ from }) => from),
      ]
    : view.active;

  return (
    <figure ref={board} className="relationship-map" data-entered={entered} aria-label="Interactive software relationship map">
      <figcaption className="map-heading">
        <span>Relationship map</span>
        <span className="map-example">Illustrative example</span>
      </figcaption>
      <div className="map-toolbar" role="group" aria-label="Map view">
        {views.map((item, index) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={viewIndex === index}
            onClick={() => { setInteraction({ revision, view: index, node: null }); setReplay((value) => value + 1); }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="map-categories" aria-hidden="true">
        <span>Systems</span><span>Business rules</span><span>Business journeys</span>
      </div>
      <div className="map-field">
        <svg className="map-dots" aria-hidden="true" width="100%" height="100%">
          <defs>
            <pattern id={patternId} width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
        <svg className="map-lines" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
          {connections.map(({ from, to, path }) => (
            <path key={`${from}-${to}`} d={path} vectorEffect="non-scaling-stroke" />
          ))}
          <g key={traceKey}>
            {activeLinks.map(({ from, to, path, delay }) => (
              <g key={`${from}-${to}`}>
                <path d={path} className="highlighted" vectorEffect="non-scaling-stroke" />
                <path d={path} className="trace-packet" pathLength="100" style={{ animationDelay: `${delay}ms` }} />
              </g>
            ))}
          </g>
        </svg>
        {nodes.map(({ id, label, x, y }) => (
          <button
            key={id}
            className="map-node"
            type="button"
            style={{ left: `${x}%`, top: `${y}%` }}
            data-highlighted={connected.includes(id)}
            aria-pressed={selected === id}
            onClick={() => setInteraction({ revision, view: viewIndex, node: selected === id ? null : id })}
          >
            <span className="node-mark" aria-hidden="true" data-column={x} />{label}
            {connected.includes(id) && <i key={traceKey} className="node-arrival" aria-hidden="true" style={{ animationDelay: `${x === 17 ? 0 : x === 50 ? 680 : 1380}ms` }} />}
          </button>
        ))}
      </div>
      <div className="map-reading">
        <span className="reading-marker" aria-hidden="true" />
        <div className="reading-body" aria-live={current ? 'polite' : 'off'} aria-atomic="true">
          <div key={activeNode?.id ?? view.label} className="reading-text">
            <p className="reading-title">{activeNode?.label ?? view.title}</p>
            <p>{activeNode?.description ?? view.description}</p>
          </div>
        </div>
        <button className="replay-trace" type="button" onClick={() => setReplay((value) => value + 1)} disabled={activeLinks.length === 0} aria-label="Replay trace">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1.7 7.4M4 4v6h6" /></svg>
          <span>Replay trace</span>
        </button>
      </div>
    </figure>
  );
}
