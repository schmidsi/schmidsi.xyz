import { llmsTxt } from '@/lib/llms';

// Static export: written once at build time to out/llms.txt
export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
