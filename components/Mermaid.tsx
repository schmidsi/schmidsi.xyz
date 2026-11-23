'use client';
import { useEffect, useId, useState } from 'react';

// Renders a ```mermaid block in the browser. The static export ships the
// source in a <pre>, so agents and no-JS readers see the text; mermaid is
// loaded on demand and swaps in the SVG once it has rendered.
export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [svg, setSvg] = useState<string>();

  useEffect(() => {
    let cancelled = false;
    import('mermaid').then(async ({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
      const { svg } = await mermaid.render(`mermaid-${id}`, chart);
      if (!cancelled) setSvg(svg);
    });
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (!svg) {
    return (
      <pre>
        <code className="language-mermaid">{chart}</code>
      </pre>
    );
  }
  return <div className="not-prose my-6 overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg }} />;
}
