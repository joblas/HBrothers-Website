
import React from 'react';

interface LogoProps {
  className?: string;
  color?: string; // Kept for compatibility, though not used with image
  mode?: 'full' | 'horizontal'; // Kept for compatibility
}

const Logo: React.FC<LogoProps> = ({ className = "h-8" }) => {
  return (
    <img 
      src="/images/H Brothers.png" 
      alt="H Brothers Logo" 
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default Logo;
