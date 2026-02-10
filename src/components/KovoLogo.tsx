interface KovoLogoProps {
  className?: string;
  showTagline?: boolean;
  inverted?: boolean;
  iconOnly?: boolean;
}

export default function KovoLogo({
  className = "",
  showTagline = true,
  inverted = false,
  iconOnly = false,
}: KovoLogoProps) {
  const color = inverted ? "#F5F0EB" : "#1A1A1A";

  if (iconOnly) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
        className={className}
        aria-label="KOVO ikonica"
      >
        <g>
          <path d="M8,8 L8,30 L18,20 L28,30 L28,8 Z" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
          <path d="M56,8 L56,30 L46,20 L36,30 L36,8 Z" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
          <path d="M8,56 L8,34 L18,44 L28,34 L28,56 Z" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
          <path d="M56,56 L56,34 L46,44 L36,34 L36,56 Z" stroke={color} strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
          <circle cx="8" cy="8" r="3.5" fill={color}/>
          <circle cx="56" cy="8" r="3.5" fill={color}/>
          <circle cx="8" cy="56" r="3.5" fill={color}/>
          <circle cx="56" cy="56" r="3.5" fill={color}/>
          <circle cx="32" cy="8" r="2.5" fill={color}/>
          <circle cx="32" cy="56" r="2.5" fill={color}/>
          <circle cx="8" cy="32" r="2.5" fill={color}/>
          <circle cx="56" cy="32" r="2.5" fill={color}/>
          <circle cx="18" cy="20" r="2" fill={color}/>
          <circle cx="46" cy="20" r="2" fill={color}/>
          <circle cx="18" cy="44" r="2" fill={color}/>
          <circle cx="46" cy="44" r="2" fill={color}/>
          <line x1="18" y1="20" x2="28" y2="30" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="46" y1="20" x2="36" y2="30" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="18" y1="44" x2="28" y2="34" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="46" y1="44" x2="36" y2="34" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="32" cy="32" r="2" fill={color}/>
        </g>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 50"
      fill="none"
      className={className}
      aria-label="KOVO — Modular Wrought Iron"
    >
      <g transform="translate(2, 3) scale(0.52)">
        <path d="M8,8 L8,30 L18,20 L28,30 L28,8 Z" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round"/>
        <path d="M56,8 L56,30 L46,20 L36,30 L36,8 Z" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round"/>
        <path d="M8,56 L8,34 L18,44 L28,34 L28,56 Z" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round"/>
        <path d="M56,56 L56,34 L46,44 L36,34 L36,56 Z" stroke={color} strokeWidth="4" fill="none" strokeLinejoin="round"/>
        <circle cx="8" cy="8" r="3.5" fill={color}/>
        <circle cx="56" cy="8" r="3.5" fill={color}/>
        <circle cx="8" cy="56" r="3.5" fill={color}/>
        <circle cx="56" cy="56" r="3.5" fill={color}/>
        <circle cx="32" cy="8" r="3" fill={color}/>
        <circle cx="32" cy="56" r="3" fill={color}/>
        <circle cx="8" cy="32" r="3" fill={color}/>
        <circle cx="56" cy="32" r="3" fill={color}/>
        <circle cx="18" cy="20" r="2.5" fill={color}/>
        <circle cx="46" cy="20" r="2.5" fill={color}/>
        <circle cx="18" cy="44" r="2.5" fill={color}/>
        <circle cx="46" cy="44" r="2.5" fill={color}/>
        <line x1="18" y1="20" x2="28" y2="30" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <line x1="46" y1="20" x2="36" y2="30" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <line x1="18" y1="44" x2="28" y2="34" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <line x1="46" y1="44" x2="36" y2="34" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="32" cy="32" r="2.5" fill={color}/>
      </g>
      <text x="42" y="30" fontFamily="var(--font-sans), 'DM Sans', sans-serif" fontSize="24" fontWeight="500" letterSpacing="8" fill={color}>KOVO</text>
      {showTagline && (
        <text x="42" y="44" fontFamily="var(--font-sans), 'DM Sans', sans-serif" fontSize="6.5" fontWeight="300" letterSpacing="3" fill={color} opacity="0.7">MODULAR WROUGHT IRON</text>
      )}
    </svg>
  );
}
