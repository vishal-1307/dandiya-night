import React from 'react';
import Link from 'next/link';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'text' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  target,
  rel,
  children,
  className = '',
  disabled,
  type = 'button',
  onClick,
  ...props
}: ButtonProps) {
  // Base classes: 8px border radius, short transition, no floating shadow, touch-friendly min height
  const baseClasses = 'inline-flex items-center justify-center font-sans font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#f5bd4e]/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99] select-none';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-2 min-h-[38px] rounded-lg',
    md: 'text-sm px-5 py-3 min-h-[48px] rounded-lg',
    lg: 'text-base px-6 py-3.5 min-h-[52px] rounded-lg',
  }[size];

  const variantClasses = {
    primary: 'bg-[#f5bd4e] text-[#140412] hover:bg-[#e5ad3e] border border-[#f5bd4e] font-bold shadow-none',
    secondary: 'bg-transparent text-[#fcf4e5] hover:bg-white/[0.06] border border-[#f5bd4e]/40 hover:border-[#f5bd4e] shadow-none',
    text: 'bg-transparent text-[#f5bd4e] hover:text-white p-0 min-h-0 underline-offset-4 hover:underline border-none rounded-none shadow-none',
    icon: 'p-2.5 min-h-[44px] min-w-[44px] rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-[#fcf4e5]',
  }[variant];

  const combinedClasses = `${baseClasses} ${variant === 'text' ? '' : sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    const isExternal = external || target === '_blank' || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel');
    if (isExternal) {
      return (
        <a
          href={href}
          target={target || (isExternal ? '_blank' : undefined)}
          rel={rel || (target === '_blank' || isExternal ? 'noopener noreferrer' : undefined)}
          className={combinedClasses}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClasses} disabled={disabled} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} {...props}>
      {children}
    </button>
  );
}
