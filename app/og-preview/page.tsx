'use client';

import { useState } from 'react';
import Link from 'next/link';

const routes = [
  { path: '/', label: 'Homepage', ogPath: '/opengraph-image' },
  {
    path: '/posts/nouns',
    label: 'Post: I minted a Noun',
    ogPath: '/posts/nouns/opengraph-image',
  },
  {
    path: '/posts/hello-world',
    label: 'Post: Hello world! The path to Blogosphere 2.0',
    ogPath: '/posts/hello-world/opengraph-image',
  },
];

export default function OGPreviewPage() {
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);
  const [key, setKey] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">OG Image Preview Tool</h1>
          <p className="text-gray-600">
            Preview Open Graph images with live reload for development
          </p>
        </div>

        {/* Route selector */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <label className="block text-sm font-medium mb-2">
            Select Route:
          </label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={selectedRoute.path}
            onChange={(e) => {
              const route = routes.find((r) => r.path === e.target.value);
              if (route) setSelectedRoute(route);
            }}
          >
            {routes.map((route) => (
              <option key={route.path} value={route.path}>
                {route.label} ({route.path})
              </option>
            ))}
          </select>

          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() => setKey(key + 1)}
            >
              🔄 Reload Image
            </button>
            <Link
              href={selectedRoute.path}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              target="_blank"
            >
              🔗 View Page
            </Link>
            <Link
              href={selectedRoute.ogPath}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              target="_blank"
            >
              🖼️ Open Image
            </Link>
          </div>
        </div>

        {/* Image preview */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Preview (1200×630)</h2>
            <p className="text-sm text-gray-600">
              Path:{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {selectedRoute.ogPath}
              </code>
            </p>
          </div>

          {/* Wrapper with 1200:630 aspect ratio */}
          <div className="relative w-full" style={{ aspectRatio: '1200/630' }}>
            <img
              key={key}
              src={`${selectedRoute.ogPath}?t=${Date.now()}`}
              alt="OG Image Preview"
              className="w-full h-full border-2 border-gray-300 rounded shadow-lg"
            />
          </div>

          {/* Metadata */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-gray-50 p-4 rounded">
            <div>
              <strong>Dimensions:</strong> 1200×630px
            </div>
            <div>
              <strong>Format:</strong> PNG
            </div>
            <div>
              <strong>Ratio:</strong> 1.91:1
            </div>
            <div>
              <strong>Target size:</strong> &lt;500KB
            </div>
          </div>
        </div>

        {/* Social preview examples */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            Social Platform Previews
          </h3>

          {/* Twitter/X preview */}
          <div className="mb-6 p-4 border rounded">
            <p className="text-sm font-medium mb-2 text-gray-700">
              Twitter / X Card
            </p>
            <div className="bg-gray-50 rounded overflow-hidden max-w-lg">
              <img
                key={`twitter-${key}`}
                src={`${selectedRoute.ogPath}?t=${Date.now()}`}
                alt="Twitter preview"
                className="w-full"
              />
              <div className="p-3 border-t">
                <p className="text-sm font-medium">
                  {selectedRoute.label.replace('Post: ', '')}
                </p>
                <p className="text-xs text-gray-600">ses.box</p>
              </div>
            </div>
          </div>

          {/* Facebook/LinkedIn preview */}
          <div className="mb-6 p-4 border rounded">
            <p className="text-sm font-medium mb-2 text-gray-700">
              Facebook / LinkedIn Card
            </p>
            <div className="bg-gray-50 rounded overflow-hidden max-w-lg">
              <img
                key={`facebook-${key}`}
                src={`${selectedRoute.ogPath}?t=${Date.now()}`}
                alt="Facebook preview"
                className="w-full"
              />
              <div className="p-3 border-t">
                <p className="text-xs text-gray-500 uppercase">ses.box</p>
                <p className="text-sm font-medium">
                  {selectedRoute.label.replace('Post: ', '')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-3">💡 Development Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              Edit{' '}
              <code className="bg-white px-2 py-1 rounded">
                app/opengraph-image.tsx
              </code>{' '}
              for homepage OG image
            </li>
            <li>
              Edit{' '}
              <code className="bg-white px-2 py-1 rounded">
                app/posts/[slug]/opengraph-image.tsx
              </code>{' '}
              for post OG images
            </li>
            <li>
              Use the <code className="bg-white px-2 py-1 rounded">switch</code>{' '}
              statement to add custom designs per post
            </li>
            <li>
              Click <strong>"Reload Image"</strong> to see changes (Next.js dev
              server auto-rebuilds on save)
            </li>
            <li>
              Use browser DevTools (F12) to inspect image properties and
              download
            </li>
            <li>
              @vercel/og uses Satori - supports Flexbox but not CSS Grid
            </li>
            <li>
              Use inline styles only (
              <code className="bg-white px-2 py-1 rounded">style={}</code>)
            </li>
          </ul>
        </div>

        {/* Testing tools */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">🧪 Testing Tools</h3>
          <p className="text-sm mb-3">
            Once deployed, test your OG images on these platforms:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.opengraph.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                OpenGraph.xyz
              </a>{' '}
              - General OG image validator
            </li>
            <li>
              <a
                href="https://cards-dev.twitter.com/validator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Twitter Card Validator
              </a>{' '}
              - Test Twitter/X cards
            </li>
            <li>
              <a
                href="https://developers.facebook.com/tools/debug/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Facebook Sharing Debugger
              </a>{' '}
              - Test Facebook/LinkedIn cards
            </li>
          </ul>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
