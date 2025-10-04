import React from 'react';

interface IconProps {
  name: 'logo' | 'warning' | 'check';
  className?: string;
}

// FIX: Replaced `JSX.Element` with `React.ReactElement` to resolve the 'Cannot find namespace JSX' error.
const ICONS: Record<IconProps['name'], React.ReactElement> = {
  logo: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  ),
  warning: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  ),
  check: (
    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  )
};

const Icon: React.FC<IconProps> = ({ name, className = 'h-6 w-6' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {ICONS[name]}
    </svg>
  );
};

export default Icon;
