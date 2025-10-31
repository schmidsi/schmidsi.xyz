import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';

export async function compileMDX(source: string) {
  const code = String(
    await compile(source, {
      outputFormat: 'function-body',
      remarkPlugins: [remarkGfm],
    }),
  );

  const { default: MDXContent } = await run(code, runtime);

  return MDXContent;
}
