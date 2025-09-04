import { useEffect, useState } from 'react';

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner = ({ className = '' }: LoadingSpinnerProps) => {
  const [frame, setFrame] = useState(0);
  const spinnerChars = ['—', '\\', '|', '/'];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % spinnerChars.length);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return <span className={`font-mono ${className}`}>{spinnerChars[frame]}</span>;
};