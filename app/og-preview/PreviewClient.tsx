'use client';

import { useEffect, useMemo, useState } from 'react';

interface PreviewClientProps {
  segments: string[];
  initialWidth: number;
  initialHeight: number;
}

const PRESETS = [
  { label: 'Default (1200×630)', width: 1200, height: 630 },
  { label: 'Square (1080×1080)', width: 1080, height: 1080 },
  { label: 'Story (1080×1920)', width: 1080, height: 1920 },
];

export function PreviewClient({ segments, initialWidth, initialHeight }: PreviewClientProps) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshKey, setRefreshKey] = useState(() => Date.now());

  const suffix = useMemo(() => {
    if (!segments.length) return '';
    return `/${segments.join('/')}`.replace(/\/+$/, '');
  }, [segments]);

  const displayPath = suffix || '/';

  useEffect(() => {
    if (!autoRefresh) return;

    const id = window.setInterval(() => {
      setRefreshKey(Date.now());
    }, 1500);

    return () => window.clearInterval(id);
  }, [autoRefresh]);

  const ogSrc = useMemo(() => {
    const query = new URLSearchParams({
      width: String(width),
      height: String(height),
      refresh: String(refreshKey),
    });

    return `/og${suffix}?${query.toString()}`;
  }, [suffix, width, height, refreshKey]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">OG Preview</p>
        <h1 className="text-3xl font-semibold text-slate-900">{displayPath}</h1>
      </header>

      <div className="mb-6 flex flex-wrap gap-3">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setWidth(preset.width);
              setHeight(preset.height);
            }}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              width === preset.width && height === preset.height
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-300 text-slate-700 hover:border-slate-400'
            }`}
          >
            {preset.label}
          </button>
        ))}
        <label className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700">
          <span>Auto refresh</span>
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(event) => setAutoRefresh(event.target.checked)}
          />
        </label>
        <button
          type="button"
          className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-slate-400"
          onClick={() => setRefreshKey(Date.now())}
        >
          Refresh now
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 text-sm text-slate-600">
          <label className="flex items-center gap-2">
            Width
            <input
              type="number"
              value={width}
              onChange={(event) => setWidth(Number(event.target.value))}
              className="w-24 rounded border border-slate-300 px-2 py-1"
              min={320}
              max={2000}
            />
          </label>
          <label className="flex items-center gap-2">
            Height
            <input
              type="number"
              value={height}
              onChange={(event) => setHeight(Number(event.target.value))}
              className="w-24 rounded border border-slate-300 px-2 py-1"
              min={320}
              max={2000}
            />
          </label>
          <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">{ogSrc}</code>
        </div>

        <div className="overflow-auto rounded-xl border border-slate-200 bg-slate-100 p-4">
          <img
            src={ogSrc}
            alt={`OG preview for ${displayPath}`}
            width={width}
            height={height}
            className="mx-auto block rounded-lg shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}

