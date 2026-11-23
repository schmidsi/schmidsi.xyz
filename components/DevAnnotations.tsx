'use client';

import dynamic from 'next/dynamic';

// Agentation toolbar: click an element, describe the change, and the annotation goes to
// agentation-mcp on :4747 (see .mcp.json), where the agent reads it.
// Dev only: NODE_ENV is inlined at build time, so production drops the import entirely
// and the static export never ships it (scripts/check-pack.sh guards that).
const Agentation =
  process.env.NODE_ENV === 'development'
    ? dynamic(() => import('agentation').then((m) => m.Agentation), {
        ssr: false,
      })
    : null;

export function DevAnnotations() {
  return Agentation && <Agentation endpoint="http://localhost:4747" />;
}
