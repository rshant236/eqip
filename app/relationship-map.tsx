'use client';

import { useId, useState } from 'react';

const nodes = [
  { id: 'orders', label: 'Order entry', x: 17, y: 23, description: 'Customer orders carry the requested price and billing terms into the ERP.' },
  { id: 'erp', label: 'ERP system', x: 17, y: 50, description: 'The proposed change starts in the ERP, where prices are calculated and orders are processed.' },
  { id: 'history', label: 'Customer history', x: 17, y: 77, description: 'Older customer agreements can explain why an order is priced differently.' },
  { id: 'exceptions', label: 'Contract terms', x: 50, y: 23, description: 'Some customers qualify for pricing exceptions under existing agreements.' },
  { id: 'pricing', label: 'Pricing rules', x: 50, y: 50, description: 'The proposed change affects how prices are calculated and passed on to billing.' },
  { id: 'tax', label: 'Tax rules', x: 50, y: 77, description: 'Tax calculation uses line prices from the ERP before invoices are issued.' },
  { id: 'fulfilment', label: 'Fulfilment', x: 83, y: 23, description: 'Fulfilment relies on confirmed orders to tell operations what to deliver.' },
  { id: 'billing', label: 'Billing', x: 83, y: 50, description: 'Compare invoices against expected prices before release. Some contract exceptions still need review.' },
  { id: 'reporting', label: 'Finance reports', x: 83, y: 77, description: 'Finance reports use posted invoices to reconcile the period’s revenue.' },
] as const;

type NodeId = typeof nodes[number]['id'];

const connections: ReadonlyArray<{ from: NodeId; to: NodeId; path: string }> = [
  { from: 'orders', to: 'exceptions', path: 'M 30 23 H 37' },
  { from: 'orders', to: 'pricing', path: 'M 30 23 H 33.5 V 50 H 37' },
  { from: 'erp', to: 'pricing', path: 'M 30 50 H 37' },
  { from: 'erp', to: 'tax', path: 'M 30 50 H 33.5 V 77 H 37' },
  { from: 'history', to: 'tax', path: 'M 30 77 H 37' },
  { from: 'exceptions', to: 'fulfilment', path: 'M 63 23 H 70' },
  { from: 'exceptions', to: 'billing', path: 'M 63 23 H 66.5 V 50 H 70' },
  { from: 'pricing', to: 'billing', path: 'M 63 50 H 70' },
  { from: 'tax', to: 'billing', path: 'M 63 77 H 66.5 V 50 H 70' },
  { from: 'tax', to: 'reporting', path: 'M 63 77 H 70' },
];

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

export default function RelationshipMap() {
  const [viewIndex, setViewIndex] = useState(1);
  const [selected, setSelected] = useState<NodeId | null>(null);
  const patternId = useId();
  const view = views[viewIndex];
  const activeNode = nodes.find((node) => node.id === selected);
  const connected = selected
    ? [
        selected,
        ...connections.filter(({ from }) => from === selected).map(({ to }) => to),
        ...connections.filter(({ to }) => to === selected).map(({ from }) => from),
      ]
    : view.active;

  return (
    <figure className="relationship-map" aria-label="Interactive software relationship map">
      <figcaption className="map-heading">
        <span>Software relationship map</span>
        <span className="map-example">Illustrative example</span>
      </figcaption>
      <div className="map-toolbar" role="group" aria-label="Map view">
        {views.map((item, index) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={viewIndex === index}
            onClick={() => { setViewIndex(index); setSelected(null); }}
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
          {connections.map(({ from, to, path }) => {
            const highlighted = selected
              ? from === selected || to === selected
              : view.active.includes(from) && view.active.includes(to);

            return <path key={`${from}-${to}`} d={path} className={highlighted ? 'highlighted' : ''} vectorEffect="non-scaling-stroke" />;
          })}
        </svg>
        {nodes.map(({ id, label, x, y }) => (
          <button
            key={id}
            className="map-node"
            type="button"
            style={{ left: `${x}%`, top: `${y}%` }}
            data-highlighted={connected.includes(id)}
            aria-pressed={selected === id}
            onClick={() => setSelected((current) => current === id ? null : id)}
          >
            <span className="node-mark" aria-hidden="true" />{label}
          </button>
        ))}
      </div>
      <div className="map-reading" aria-live="polite" aria-atomic="true">
        <span className="reading-marker" aria-hidden="true" />
        <div>
          <p className="reading-title">{activeNode?.label ?? view.title}</p>
          <p>{activeNode?.description ?? view.description}</p>
        </div>
      </div>
    </figure>
  );
}
