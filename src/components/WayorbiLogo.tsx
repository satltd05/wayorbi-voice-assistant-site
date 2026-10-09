import React from 'react';

interface WayorbiLogoIconProps {
  className?: string;
  size?: number | string;
  animated?: boolean;
}

export const WayorbiLogoIcon: React.FC<WayorbiLogoIconProps> = ({
  className = '',
  size = 40,
  animated = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 512 512"
        width="100%"
        height="100%"
        className="overflow-visible drop-shadow-md"
      >
        <defs>
          {/* Main squircle gradient */}
          <linearGradient id="iconBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4C91FE" />
            <stop offset="45%" stop-color="#6F7DFE" />
            <stop offset="100%" stop-color="#B46BFE" />
          </linearGradient>

          {/* Globe ocean radial */}
          <radialGradient id="iconOceanGrad" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#5599FF" />
            <stop offset="45%" stop-color="#2563EB" />
            <stop offset="85%" stop-color="#1D4ED8" />
            <stop offset="100%" stop-color="#1E3A8A" />
          </radialGradient>

          {/* Continents gradient */}
          <linearGradient id="iconContinentGrad" x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stop-color="#A5CEFF" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#60A5FA" stop-opacity="0.8" />
          </linearGradient>

          {/* Orbit trail gradient */}
          <linearGradient id="iconOrbitGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#E0F2FE" stop-opacity="0.75" />
            <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#E9D5FF" stop-opacity="0.7" />
          </linearGradient>

          {/* Plane 3D lighting */}
          <linearGradient id="iconPlaneBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="60%" stop-color="#F8FAFC" />
            <stop offset="100%" stop-color="#E2E8F0" />
          </linearGradient>

          <linearGradient id="iconPlaneWing" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="100%" stop-color="#CBD5E1" />
          </linearGradient>

          {/* Globe highlight */}
          <radialGradient id="iconGlobeHighlight" cx="32%" cy="28%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.45" />
            <stop offset="45%" stop-color="#93C5FD" stop-opacity="0.12" />
            <stop offset="100%" stop-color="#1E3A8A" stop-opacity="0" />
          </radialGradient>

          <filter id="iconPlaneShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="-8" dy="12" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.35" />
          </filter>
        </defs>

        {/* Squircle App Icon container */}
        <rect
          x="16"
          y="16"
          width="480"
          height="480"
          rx="110"
          ry="110"
          fill="url(#iconBgGrad)"
        />
        {/* Subtle inner border */}
        <rect
          x="16"
          y="16"
          width="480"
          height="480"
          rx="110"
          ry="110"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          stroke-width="3"
        />

        {/* Back orbit path */}
        <path
          d="M 125 315 C 80 290 85 240 145 230 C 190 222 250 232 300 248"
          fill="none"
          stroke="url(#iconOrbitGrad)"
          stroke-width="14"
          stroke-linecap="round"
          opacity="0.65"
        />

        {/* Globe Atmosphere Outer Rim */}
        <circle
          cx="256"
          cy="256"
          r="148"
          fill="none"
          stroke="rgba(191, 219, 254, 0.35)"
          stroke-width="5"
        />

        {/* Globe Sphere */}
        <circle cx="256" cy="256" r="144" fill="url(#iconOceanGrad)" />

        {/* Continents */}
        <g fill="url(#iconContinentGrad)">
          {/* Americas */}
          <path d="M 195 155 C 215 150 245 155 250 170 C 255 185 235 200 225 210 C 215 220 205 235 185 230 C 170 225 160 210 165 195 C 170 175 180 160 195 155 Z" />
          <path d="M 195 245 C 215 245 230 260 225 285 C 220 310 205 340 190 355 C 180 350 175 325 180 300 C 185 275 180 250 195 245 Z" />
          {/* Eurasia / Africa */}
          <path d="M 280 165 C 295 160 320 170 315 185 C 310 200 295 205 285 195 Z" />
          <path d="M 275 215 C 295 210 325 230 330 265 C 335 305 315 345 295 350 C 285 345 280 315 285 280 C 290 250 270 230 275 215 Z" />
        </g>

        {/* Globe Specular Lighting */}
        <circle cx="256" cy="256" r="144" fill="url(#iconGlobeHighlight)" />

        {/* Front Orbit Swoop Ring */}
        <path
          d="M 95 280 C 110 320 160 345 240 330 C 310 318 365 275 415 230"
          fill="none"
          stroke="url(#iconOrbitGrad)"
          stroke-width="16"
          stroke-linecap="round"
        />
        <path
          d="M 95 280 C 110 320 160 345 240 330 C 310 318 365 275 415 230"
          fill="none"
          stroke="#FFFFFF"
          stroke-width="8"
          stroke-linecap="round"
        />

        {/* 3D Airplane */}
        <g
          transform="translate(325, 230) rotate(-42)"
          filter="url(#iconPlaneShadow)"
          className={animated ? 'animate-[pulse_4s_ease-in-out_infinite]' : ''}
        >
          {/* Fuselage */}
          <path
            d="M 0 -85 C 10 -60 14 -10 14 60 C 14 78 7 85 0 88 C -7 85 -14 78 -14 60 C -14 -10 -10 -60 0 -85 Z"
            fill="url(#iconPlaneBody)"
          />
          {/* Spine Highlight */}
          <path
            d="M 0 -82 C 4 -60 5 -10 5 60 C 5 75 2 82 0 85 C -2 82 -5 75 -5 60 C -5 -10 -4 -60 0 -82 Z"
            fill="#FFFFFF"
            opacity="0.8"
          />
          {/* Left Wing */}
          <path
            d="M -12 -10 L -95 20 C -102 24 -98 32 -90 32 L -14 22 Z"
            fill="url(#iconPlaneWing)"
          />
          {/* Right Wing */}
          <path
            d="M 12 -10 L 95 20 C 102 24 98 32 90 32 L 14 22 Z"
            fill="url(#iconPlaneBody)"
          />
          {/* Tail Left */}
          <path
            d="M -8 55 L -42 74 C -46 76 -44 80 -40 80 L -8 72 Z"
            fill="url(#iconPlaneWing)"
          />
          {/* Tail Right */}
          <path
            d="M 8 55 L 42 74 C 46 76 44 80 40 80 L 8 72 Z"
            fill="url(#iconPlaneBody)"
          />
          {/* Vertical Tail Fin */}
          <path d="M 0 45 L 0 78 C 3 82 4 82 4 75 L 2 45 Z" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

interface WayorbiWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const WayorbiWordmark: React.FC<WayorbiWordmarkProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  };

  return (
    <span
      className={`font-['Playfair_Display',serif] font-bold tracking-tight inline-block bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent drop-shadow-sm select-none ${sizeClasses[size]} ${className}`}
      style={{
        backgroundSize: '100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      Wayorbi
    </span>
  );
};

interface WayorbiBrandProps {
  iconSize?: number;
  wordmarkSize?: 'sm' | 'md' | 'lg' | 'xl';
  subtitle?: string;
  className?: string;
}

export const WayorbiBrand: React.FC<WayorbiBrandProps> = ({
  iconSize = 42,
  wordmarkSize = 'md',
  subtitle,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <WayorbiLogoIcon size={iconSize} animated />
      <div className="flex flex-col">
        <WayorbiWordmark size={wordmarkSize} />
        {subtitle && (
          <span className="text-xs text-slate-400 font-medium tracking-wide -mt-1">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
