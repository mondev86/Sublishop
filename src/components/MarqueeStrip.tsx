import React from 'react';

export const MarqueeStrip: React.FC = () => {
  const items = [
    '✦ SUBLIMACIÓN TEXTIL DE ALTA DEFINICIÓN',
    '✦ DESDE 1 SOLA UNIDAD',
    '✦ TINTAS ECOLÓGICAS OEKO-TEX®',
    '✦ ENVÍO 48-72H CON TRACKING',
    '✦ CERO TACTO PLÁSTICO',
    '✦ NO SE CUARTEA NI PIERDE COLOR AL LAVAR',
    '✦ CAMISETAS OVERSIZE STREETWEAR 220G',
    '✦ 15% DTO. DE BIENVENIDA CON CÓDIGO SUBLI15',
    '✦ ASESORÍA DE DISEÑO GRATIS POR WHATSAPP'
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#120c28] text-white py-3 border-y border-purple-500/25 shadow-sm select-none">
      {/* Top subtle rainbow accent */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bar-flow opacity-80" />

      {/* Infinite Scrolling track */}
      <div className="flex whitespace-nowrap will-change-transform animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused]">
        {/* Track 1 */}
        <div className="flex items-center shrink-0 space-x-8 px-4 text-xs font-black tracking-widest uppercase">
          {items.map((item, idx) => (
            <span
              key={`m1-${idx}`}
              data-keep-white
              className={
                idx % 3 === 0
                  ? 'text-pink-400 font-extrabold'
                  : idx % 3 === 1
                  ? 'text-teal-400 font-extrabold'
                  : 'text-purple-200'
              }
            >
              {item}
            </span>
          ))}
        </div>

        {/* Track 2 duplicate for seamless loop */}
        <div className="flex items-center shrink-0 space-x-8 px-4 text-xs font-black tracking-widest uppercase" aria-hidden="true">
          {items.map((item, idx) => (
            <span
              key={`m2-${idx}`}
              data-keep-white
              className={
                idx % 3 === 0
                  ? 'text-pink-400 font-extrabold'
                  : idx % 3 === 1
                  ? 'text-teal-400 font-extrabold'
                  : 'text-purple-200'
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom subtle accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bar-flow opacity-40" />
    </div>
  );
};
