
import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
  mode?: 'full' | 'horizontal';
}

const Logo: React.FC<LogoProps> = ({ className = "h-8", color = "#182C2D", mode = 'horizontal' }) => {
  // We unify the logo to always be horizontal as per user request to "match the header"
  // Widened ViewBox (620) ensures 'S' is never chopped even with padding
  
  const renderLogoContent = (fill: string) => {
    // Inline detail opacity depends on the background context, but usually looks best around 0.5-0.7
    const inlineOpacity = 0.6;
    
    return (
      <g transform="translate(10, 10)">
        {/* H */}
        <g>
          <path d="M0 0 H18 V22 H32 V0 H50 V60 H32 V38 H18 V60 H0 V0Z" fill={fill} />
          <path d="M7 6 V54 M43 6 V54 M18 30 H32" stroke="white" strokeWidth="2.5" opacity={inlineOpacity} strokeLinecap="round" />
        </g>

        {/* Diamond Separator */}
        <g transform="translate(85, 30) rotate(45)">
          <rect x="-15" y="-15" width="30" height="30" stroke={fill} strokeWidth="3" />
          <path d="M-15 -15 L15 -15 L0 0 Z" fill={fill} />
          <path d="M-15 15 L15 15 L0 0 Z" fill={fill} />
        </g>

        {/* BROTHERS */}
        <g transform="translate(125, 0)" fill={fill}>
          {/* B */}
          <g>
            <path d="M0 0 H25 C35 0 40 5 40 15 C40 22 35 27 28 29 C36 31 42 37 42 47 C42 56 36 60 25 60 H0 V0ZM12 10 V24 H24 C28 24 28 10 24 10 H12ZM12 36 V50 H26 C30 50 30 36 26 36 H12Z" />
            <path d="M6 6 V54 M12 17 H24 M12 43 H26" stroke="white" strokeWidth="2" opacity={inlineOpacity} fill="none" />
          </g>
          {/* R */}
          <g transform="translate(55, 0)">
            <path d="M0 0 H25 C35 0 35 20 28 25 L42 60 H28 L18 32 H12 V60 H0 V0ZM12 10 V22 H24 C28 22 28 10 24 10 H12Z" />
            <path d="M6 6 V54 M12 16 H24" stroke="white" strokeWidth="2" opacity={inlineOpacity} fill="none" />
          </g>
          {/* O */}
          <g transform="translate(110, 0)">
            <path d="M22 0 C38 0 44 15 44 30 C44 45 38 60 22 60 C6 60 0 45 0 30 C0 15 6 0 22 0ZM22 10 C16 10 12 18 12 30 C12 42 16 50 22 50 C28 50 32 42 32 30 C32 18 28 10 22 10Z" />
            <path d="M22 10 A12 12 0 0 0 22 50 A12 12 0 0 0 22 10" stroke="white" strokeWidth="2" opacity={inlineOpacity} fill="none" />
          </g>
          {/* T */}
          <g transform="translate(168, 0)">
            <path d="M0 0 H46 V12 H30 V60 H16 V12 H0 V0Z" />
            <path d="M6 6 H40 M23 12 V54" stroke="white" strokeWidth="2" opacity={inlineOpacity} fill="none" />
          </g>
          {/* H */}
          <g transform="translate(225, 0)">
            <path d="M0 0 H14 V24 H28 V0 H42 V60 H28 V36 H14 V60 H0 V0Z" />
            <path d="M7 6 V54 M35 6 V54 M14 30 H28" stroke="white" strokeWidth="2" opacity={inlineOpacity} fill="none" />
          </g>
          {/* E */}
          <g transform="translate(280, 0)">
            <path d="M0 0 H40 V12 H14 V24 H34 V36 H14 V48 H40 V60 H0 V0Z" />
            <path d="M7 6 V54 M14 6 H34 M14 30 H28 M14 54 H34" stroke="white" strokeWidth="2" opacity={inlineOpacity} fill="none" />
          </g>
          {/* R */}
          <g transform="translate(332, 0)">
            <path d="M0 0 H25 C35 0 35 20 28 25 L42 60 H28 L18 32 H12 V60 H0 V0ZM12 10 V22 H24 C28 22 28 10 24 10 H12Z" />
            <path d="M6 6 V54 M12 16 H24" stroke="white" strokeWidth="2" opacity={inlineOpacity} fill="none" />
          </g>
          {/* S - CRITICAL FIX: Ensure no clipping by allowing ample width in parent group and viewBox */}
          <g transform="translate(388, 0)">
            <path d="M42 18 H30 C30 14 28 10 21 10 C14 10 12 13 12 18 C12 22 15 26 26 30 C37 34 42 40 42 50 C42 60 34 66 21 66 C10 66 0 58 0 45 H12 C12 50 16 54 21 54 C26 54 30 51 30 47 C30 43 26 40 18 36 C8 32 0 26 0 17 C0 6 11 0 21 0 C31 0 42 7 42 18Z" />
            <path d="M21 8 C15 8 13 13 13 18 C13 22 15 26 24 28 C30 31 32 35 32 45 C32 50 28 53 21 53" stroke="white" strokeWidth="2.5" opacity={inlineOpacity} fill="none" strokeLinecap="round" />
          </g>
        </g>
      </g>
    );
  };

  // We use the same viewBox for both to keep things consistent and prevent broken layouts
  return (
    <svg 
      viewBox="0 0 620 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {renderLogoContent(color)}
    </svg>
  );
};

export default Logo;
