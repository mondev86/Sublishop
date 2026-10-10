import React from 'react';
import { REAL_MOCKUPS, BLANK_MOCKUPS } from '../assets/mockupImages';

interface ApparelMockupProps {
  type: 'tshirt-classic' | 'tshirt-oversize' | 'hoodie-hd' | 'tote-bag' | 'gymsack' | string;
  artUrl?: string;
  artPreset?: 'cyberpunk' | 'anime' | 'streetwear' | 'minimal' | 'custom';
  colorHex?: string;
  className?: string;
  badge?: string;
  forceRealisticPhoto?: boolean;
}

export const PRESET_ARTS = {
  cyberpunk: {
    title: 'NEO-TOKYO CYBER 2049',
    tag: 'Streetwear Graphic',
    gradient: 'from-pink-500 via-purple-500 to-cyan-400',
    svgIcon: (
      <svg viewBox="0 0 200 240" className="w-full h-full filter drop-shadow-md select-none">
        <defs>
          <linearGradient id="cyberNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2a5f" />
            <stop offset="45%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="cyberChromeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ff2a5f" />
          </linearGradient>
        </defs>

        {/* Cyberpunk Outer Frame */}
        <rect x="10" y="10" width="180" height="220" rx="12" fill="#0d0c18" fillOpacity="0.85" stroke="url(#cyberNeonGrad)" strokeWidth="3" />
        
        {/* Cityscape Skyline Grid Silhouette */}
        <path d="M15 150 L35 150 L35 120 L50 120 L50 90 L65 90 L65 140 L80 140 L80 80 L100 80 L100 70 L115 70 L115 110 L135 110 L135 95 L150 95 L150 135 L165 135 L165 115 L185 115 L185 180 L15 180 Z" fill="#1e183a" opacity="0.8" />
        <line x1="15" y1="150" x2="185" y2="150" stroke="#ff2a5f" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="15" y1="165" x2="185" y2="165" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="15" y1="180" x2="185" y2="180" stroke="#8b5cf6" strokeWidth="1.5" />

        {/* Neon Sun / Horizon */}
        <circle cx="100" cy="85" r="34" fill="none" stroke="url(#cyberNeonGrad)" strokeWidth="3" />
        <line x1="68" y1="78" x2="132" y2="78" stroke="#0d0c18" strokeWidth="2.5" />
        <line x1="72" y1="88" x2="128" y2="88" stroke="#0d0c18" strokeWidth="2.5" />
        <line x1="78" y1="98" x2="122" y2="98" stroke="#0d0c18" strokeWidth="2.5" />

        {/* Kanji & Typography */}
        <text x="100" y="42" textAnchor="middle" fill="url(#cyberChromeGrad)" fontSize="20" fontWeight="900" fontFamily="sans-serif" letterSpacing="3">
          NEO-TOKYO
        </text>
        <text x="100" y="60" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="800" fontFamily="sans-serif" letterSpacing="4">
          FUTURE CITY
        </text>
        <text x="100" y="132" textAnchor="middle" fill="#ffffff" fontSize="26" fontWeight="900" fontFamily="sans-serif" letterSpacing="6">
          ネオ東京
        </text>
        <text x="100" y="152" textAnchor="middle" fill="#ff2a5f" fontSize="12" fontWeight="800" fontFamily="sans-serif" letterSpacing="4">
          未来都市 2049
        </text>

        {/* Bottom Technical Spec Badges */}
        <rect x="25" y="195" width="150" height="22" rx="4" fill="#18132d" stroke="#8b5cf6" strokeWidth="1" />
        <text x="100" y="210" textAnchor="middle" fill="#f8fafc" fontSize="8.5" fontWeight="800" fontFamily="monospace" letterSpacing="2">
          SUBLISHOP // APPAREL CULTURE
        </text>

        {/* Barcode & Crosshairs */}
        <g opacity="0.7">
          <line x1="25" y1="222" x2="35" y2="222" stroke="#ff2a5f" strokeWidth="2" />
          <line x1="40" y1="222" x2="48" y2="222" stroke="#06b6d4" strokeWidth="2" />
          <line x1="52" y1="222" x2="68" y2="222" stroke="#ffffff" strokeWidth="1" />
          <line x1="135" y1="222" x2="175" y2="222" stroke="#ff2a5f" strokeWidth="1.5" strokeDasharray="3,2" />
        </g>
      </svg>
    )
  },
  anime: {
    title: 'CYBER MECHA PILOT 2077',
    tag: 'Manga Anime Art',
    gradient: 'from-amber-400 via-rose-500 to-indigo-600',
    svgIcon: (
      <svg viewBox="0 0 200 240" className="w-full h-full filter drop-shadow-md select-none">
        <defs>
          <linearGradient id="animeSunset" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="40%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>

        {/* Anime Frame with Corner Accents */}
        <rect x="12" y="12" width="176" height="216" rx="8" fill="#110d22" fillOpacity="0.9" stroke="#f43f5e" strokeWidth="2.5" />
        <line x1="8" y1="20" x2="24" y2="20" stroke="#fbbf24" strokeWidth="3" />
        <line x1="20" y1="8" x2="20" y2="24" stroke="#fbbf24" strokeWidth="3" />
        <line x1="176" y1="20" x2="192" y2="20" stroke="#06b6d4" strokeWidth="3" />
        <line x1="180" y1="8" x2="180" y2="24" stroke="#06b6d4" strokeWidth="3" />

        {/* Glowing Sun Halo */}
        <circle cx="100" cy="95" r="48" fill="url(#animeSunset)" opacity="0.9" />

        {/* Cyber Anime Pilot Visor Silhouette */}
        <path d="M70 85 Q100 65 130 85 Q140 115 125 135 Q100 145 75 135 Q60 115 70 85 Z" fill="#0d0a1a" stroke="#06b6d4" strokeWidth="2.5" />
        <path d="M75 92 Q100 78 125 92 Q130 108 120 118 Q100 126 80 118 Q70 108 75 92 Z" fill="#06b6d4" fillOpacity="0.8" stroke="#ffffff" strokeWidth="1" />
        
        {/* Manga Kanji Header & Footer */}
        <text x="100" y="38" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900" fontFamily="sans-serif" letterSpacing="4">
          機動戦士
        </text>
        <text x="100" y="54" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" fontFamily="sans-serif" letterSpacing="3">
          CYBER MECHA PILOT // 01
        </text>

        <text x="100" y="175" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="900" fontFamily="sans-serif" letterSpacing="5">
          サイバーパンク
        </text>
        <text x="100" y="195" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="4">
          AKIRA PROJECT 2077
        </text>

        {/* Warning Bar */}
        <rect x="25" y="206" width="150" height="12" fill="#fbbf24" rx="2" />
        <text x="100" y="215" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="900" fontFamily="monospace" letterSpacing="2">
          WARNING: HIGH VOLTAGE HD PRINT
        </text>
      </svg>
    )
  },
  streetwear: {
    title: 'ABSTRACT CHAOS STREETWEAR',
    tag: 'Bold Typography',
    gradient: 'from-orange-500 via-rose-500 to-indigo-600',
    svgIcon: (
      <svg viewBox="0 0 200 240" className="w-full h-full filter drop-shadow-md select-none">
        <defs>
          <linearGradient id="streetOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8c42" />
            <stop offset="50%" stopColor="#ff2a5f" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>

        {/* Streetwear Graffiti Block Background */}
        <rect x="15" y="15" width="170" height="210" rx="10" fill="#141124" fillOpacity="0.9" stroke="url(#streetOrange)" strokeWidth="3" />
        
        {/* Halftone & Splatter Dots */}
        <g fill="#ff8c42" opacity="0.6">
          <circle cx="35" cy="40" r="3" />
          <circle cx="45" cy="40" r="2" />
          <circle cx="55" cy="40" r="4" />
          <circle cx="155" cy="40" r="3" />
          <circle cx="165" cy="45" r="2" />
          <circle cx="35" cy="195" r="4" />
          <circle cx="160" cy="190" r="3" />
        </g>

        {/* Skull Graphic Accent */}
        <circle cx="100" cy="70" r="24" fill="#ff2a5f" opacity="0.25" />
        <path d="M85 65 Q100 48 115 65 Q118 80 110 88 L106 96 L94 96 L90 88 Q82 80 85 65 Z" fill="#ffffff" />
        <circle cx="93" cy="68" r="4" fill="#141124" />
        <circle cx="107" cy="68" r="4" fill="#141124" />
        <line x1="97" y1="84" x2="103" y2="84" stroke="#141124" strokeWidth="2" />

        {/* Heavy Graffiti Typography */}
        <text x="100" y="125" textAnchor="middle" fill="#ff8c42" fontSize="28" fontWeight="900" fontFamily="sans-serif" fontStyle="italic" letterSpacing="1">
          ABSTRACT
        </text>
        <text x="100" y="155" textAnchor="middle" fill="#ffffff" fontSize="34" fontWeight="900" fontFamily="sans-serif" fontStyle="italic" letterSpacing="2">
          CHAOS
        </text>
        <text x="100" y="178" textAnchor="middle" fill="#ff2a5f" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="5">
          STREETWEAR CLUB
        </text>

        {/* Origin Seal */}
        <line x1="30" y1="190" x2="170" y2="190" stroke="#4f46e5" strokeWidth="2" />
        <text x="100" y="208" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontWeight="800" fontFamily="monospace" letterSpacing="2">
          EST. 2026 // BARCELONA - TOKYO
        </text>
      </svg>
    )
  },
  minimal: {
    title: 'STUDIO BOTANICAL & SACRED',
    tag: 'Fine Line Minimal',
    gradient: 'from-teal-400 to-emerald-600',
    svgIcon: (
      <svg viewBox="0 0 200 240" className="w-full h-full filter drop-shadow-md select-none">
        {/* Minimal Subtle Circle & Geometry */}
        <circle cx="100" cy="100" r="65" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,4" />
        <circle cx="100" cy="100" r="50" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="2" />
        <polygon points="100,45 145,125 55,125" fill="none" stroke="#34d399" strokeWidth="1.5" />
        <polygon points="100,155 145,75 55,75" fill="none" stroke="#34d399" strokeWidth="1.5" opacity="0.6" />

        {/* Botanical leaf path */}
        <path d="M100 65 Q115 85 115 105 Q115 125 100 135 Q85 125 85 105 Q85 85 100 65 Z" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />
        <line x1="100" y1="75" x2="100" y2="135" stroke="#ffffff" strokeWidth="1.5" />

        {/* Fine Typography */}
        <text x="100" y="180" textAnchor="middle" fill="#10b981" fontSize="15" fontWeight="800" fontFamily="serif" letterSpacing="4">
          ORGANIC FIBERS
        </text>
        <text x="100" y="196" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="700" fontFamily="sans-serif" letterSpacing="3">
          SUBLISHOP BOTANICAL STUDIO
        </text>
        <text x="100" y="212" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="600" fontFamily="monospace" letterSpacing="2">
          OEKO-TEX CERTIFIED // 100% RECYCLED
        </text>
      </svg>
    )
  }
};

export const ApparelMockup: React.FC<ApparelMockupProps> = ({
  type,
  artUrl,
  artPreset,
  colorHex = '#FFFFFF',
  className = '',
  badge,
  forceRealisticPhoto = false,
}) => {
  const realPhotoSrc = REAL_MOCKUPS[type] || REAL_MOCKUPS['tshirt-oversize'];
  const blankPhotoSrc = BLANK_MOCKUPS[type] || BLANK_MOCKUPS['tshirt-oversize'];

  // Check if default flagship preset matches this garment type
  const isDefaultPresetForType =
    (type === 'tshirt-oversize' && (artPreset === 'cyberpunk' || !artPreset)) ||
    (type === 'hoodie-hd' && (artPreset === 'anime' || !artPreset)) ||
    (type === 'tshirt-classic' && (artPreset === 'streetwear' || !artPreset)) ||
    (type === 'tote-bag' && (artPreset === 'minimal' || !artPreset)) ||
    (type === 'gymsack' && (artPreset === 'cyberpunk' || !artPreset));

  // If forceRealisticPhoto is active OR (no custom upload, pure white base, and lookbook/matching preset)
  const shouldUseDirectPhoto =
    forceRealisticPhoto ||
    (!artUrl && (colorHex === '#FFFFFF' || !colorHex) && realPhotoSrc && isDefaultPresetForType);

  if (shouldUseDirectPhoto) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl select-none group shadow-lg ${className}`}>
        <img
          src={realPhotoSrc}
          alt={`Fotografía de estudio real de ${type}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
          loading="lazy"
        />

        {/* Realistic studio lighting sheen */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10 pointer-events-none rounded-2xl" />

        {/* Realism Badge */}
        <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[9px] font-black tracking-widest uppercase text-white/95 border border-white/20">
          FOTO REAL ESTUDIO 300 DPI
        </div>

        {badge && (
          <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-pink-500 text-white text-[10px] font-black tracking-wider uppercase shadow-md">
            {badge}
          </div>
        )}
      </div>
    );
  }

  // Interactive Customizer Mode: Render high-fidelity blank mockup with precise garment-tailored print zone
  const preset =
    artPreset && artPreset in PRESET_ARTS
      ? PRESET_ARTS[artPreset as keyof typeof PRESET_ARTS]
      : PRESET_ARTS.cyberpunk;

  const isDarkBase =
    colorHex === '#1E293B' ||
    colorHex === '#0F172A' ||
    colorHex?.toLowerCase() === '#18181b' ||
    colorHex?.toLowerCase() === '#141124';

  const isGreyBase = colorHex === '#E2E8F0' || colorHex === '#CBD5E1';
  const isStoneBase = colorHex === '#F5F5F0' || colorHex === '#FDFBF7';

  // Garment-specific print zone coordinates tailored to each cut and garment silhouette
  const getPrintZoneClass = () => {
    switch (type) {
      case 'hoodie-hd':
      case 'hoodie-sublimada':
        return 'top-[33%] w-[38%] h-[32%]';
      case 'tote-bag':
      case 'tote-bag-sublimada':
        return 'top-[44%] w-[44%] h-[40%]';
      case 'gymsack':
      case 'mochila-sublimada':
        return 'top-[27%] w-[48%] h-[50%]';
      case 'tshirt-classic':
      case 'camiseta-clasica':
        return 'top-[26%] w-[42%] h-[42%]';
      case 'tshirt-oversize':
      case 'camiseta-oversize':
      default:
        return 'top-[25%] w-[45%] h-[45%]';
    }
  };

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl select-none group shadow-lg ${className}`}>
      {blankPhotoSrc ? (
        <div className="relative w-full h-full flex items-center justify-center bg-slate-950/20">
          {/* Base Real Blank Garment Photo */}
          <img
            src={blankPhotoSrc}
            alt={`Base realista de prenda ${type}`}
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* Realistic Fabric Dye Tinting Layer (simulates dyed polyester/cotton garment) */}
          {colorHex !== '#FFFFFF' && (
            <div
              className={`absolute inset-0 rounded-2xl pointer-events-none ${
                isDarkBase
                  ? 'bg-slate-900/80 mix-blend-multiply'
                  : isGreyBase
                  ? 'bg-slate-300/65 mix-blend-multiply'
                  : isStoneBase
                  ? 'bg-amber-100/50 mix-blend-multiply'
                  : 'mix-blend-multiply opacity-75'
              }`}
              style={{ backgroundColor: colorHex }}
            />
          )}

          {/* Subtle Cotton Weave & Crease Lighting Map */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/15 mix-blend-overlay pointer-events-none rounded-2xl" />

          {/* Sublimation Print Zone positioned with realistic apparel perspective */}
          <div
            className={`absolute flex items-center justify-center p-1 pointer-events-none transition-transform duration-300 group-hover:scale-102 ${getPrintZoneClass()}`}
          >
            {/* Ink Absorption Blend: simulates sublimation gas dye fused directly into poly-cotton fibers */}
            <div
              className={`w-full h-full flex items-center justify-center ${
                isDarkBase
                  ? 'mix-blend-screen opacity-95 filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]'
                  : 'mix-blend-multiply opacity-95 filter contrast-105'
              }`}
            >
              {artUrl ? (
                <img
                  src={artUrl}
                  alt="Diseño sublimado personalizado"
                  className="w-full h-full object-contain filter drop-shadow-xs"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {preset.svgIcon}
                </div>
              )}
            </div>
          </div>

          {/* Fabric Drape Shadow Overlay (Preserves realism of chest creases over the print) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 pointer-events-none rounded-2xl" />

          {/* Textile Certification Tag */}
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[9px] font-black tracking-widest uppercase text-pink-400 border border-pink-500/30">
            SIMULADOR TEXTIL REAL 300 DPI
          </div>
        </div>
      ) : (
        /* Fallback */
        <div className="w-full h-full flex items-center justify-center bg-slate-900 rounded-2xl p-4">
          {artUrl ? (
            <img src={artUrl} alt="Diseño" className="max-h-[85%] max-w-[85%] object-contain" />
          ) : (
            preset.svgIcon
          )}
        </div>
      )}

      {badge && (
        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-pink-500 text-white text-[10px] font-black tracking-wider uppercase shadow-md">
          {badge}
        </div>
      )}
    </div>
  );
};
