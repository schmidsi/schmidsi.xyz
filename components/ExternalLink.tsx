import type { ComponentProps } from 'react';

// Marks links that leave the site, so readers know a click opens another page
const defaultIconClass =
  'ml-[0.25em] inline-block h-[0.75em] w-[0.75em] align-baseline';

export function ExternalLink({
  children,
  iconClassName = defaultIconClass,
  ...props
}: ComponentProps<'a'> & { iconClassName?: string }) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={iconClassName}
      >
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    </a>
  );
}
