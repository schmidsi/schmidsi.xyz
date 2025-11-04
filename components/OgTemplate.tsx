import type { CSSProperties } from 'react';

export interface OgTemplateProps {
  title: string;
  description?: string;
  badge?: string;
  footer?: string;
  accent?: string;
}

const containerStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: '32px',
  padding: '72px',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  color: '#0f172a',
  fontFamily: 'Figtree, Roboto Mono, system-ui, -apple-system, BlinkMacSystemFont',
};

const titleStyle: CSSProperties = {
  fontSize: 72,
  fontWeight: 700,
  lineHeight: 1.05,
  maxWidth: '1000px',
};

const descriptionStyle: CSSProperties = {
  fontSize: 30,
  lineHeight: 1.35,
  color: '#334155',
  maxWidth: '920px',
};

const topBarStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: 28,
  textTransform: 'uppercase',
  letterSpacing: 6,
  color: '#64748b',
};

const footerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  fontSize: 28,
  color: '#475569',
};

const badgeStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px 24px',
  borderRadius: 999,
  fontSize: 24,
  fontWeight: 600,
  backgroundColor: 'rgba(15, 23, 42, 0.08)',
  color: '#0f172a',
};

export function OgTemplate({
  title,
  description,
  badge,
  footer,
  accent = '#0f172a',
}: OgTemplateProps) {
  const badgeStyles = {
    ...badgeStyle,
    backgroundColor: `${accent}14`,
    color: accent,
  } satisfies CSSProperties;

  return (
    <div style={containerStyle}>
      <div style={topBarStyle}>
        <span>Simon Emanuel Schmid</span>
        <span>ses.eth</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {badge ? <span style={badgeStyles}>{badge}</span> : null}
        <h1 style={titleStyle}>{title}</h1>
        {description ? <p style={descriptionStyle}>{description}</p> : null}
      </div>

      <div style={footerStyle}>
        <span>blogosphere 2.0</span>
        {footer ? <span>{footer}</span> : <span>schmid.io</span>}
      </div>
    </div>
  );
}

