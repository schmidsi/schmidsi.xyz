/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx,md,mdx}',
    './content/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      lineHeight: {
        negative: '0.8',
      },
      fontFamily: {
        sans: ['var(--font-figtree)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
