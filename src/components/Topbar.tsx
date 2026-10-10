import React, { useState } from 'react';
import { Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const Topbar: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const promoCode = 'SUBLI15';

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    toast.success('¡Código SUBLI15 copiado al portapapeles! 15% de descuento listo.');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <aside aria-label="Aviso de apertura" className="relative z-40 bg-[#0e0922] light:bg-slate-100 text-white light:text-slate-900 text-xs py-2 px-3 sm:px-4 overflow-hidden border-b border-purple-500/25 light:border-slate-200 transition-colors">
      {/* Dynamic Rainbow Top Edge */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bar-flow" />

      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        {/* Left: Opening Announcement */}
        <div className="flex items-center gap-2 font-medium">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 text-xs">
            <Sparkles className="w-3 h-3 text-[#ff2a5f]" />
          </span>
          <span>
            <strong className="text-white light:text-slate-900 font-semibold">¡Apertura oficial SubliShop!</strong>{' '}
            <span className="hidden sm:inline text-purple-200/80 light:text-slate-600">
              15% DTO en tu primera prenda + Envío GRATIS a partir de 35€
            </span>
            <span className="sm:hidden text-purple-200/80 light:text-slate-600">15% DTO de bienvenida</span>
          </span>
        </div>

        {/* Right: Coupon Code & Action */}
        <div className="flex items-center gap-2.5 ml-auto">
          <button
            onClick={handleCopy}
            className="group flex items-center gap-1.5 bg-purple-950/80 light:bg-pink-50 hover:bg-purple-900/80 light:hover:bg-pink-100 text-pink-300 light:text-pink-600 hover:text-white light:hover:text-pink-700 px-2.5 py-1 rounded-md border border-pink-500/40 light:border-pink-300 transition-all font-mono text-[11px] font-bold cursor-pointer shadow-xs"
            title="Copiar cupón de descuento"
            aria-label="Copiar código promocional SUBLI15"
          >
            <span>CÓDIGO:</span>
            <span className="text-pink-400 light:text-pink-600 font-extrabold tracking-wider">{promoCode}</span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400 light:text-emerald-600" />
            ) : (
              <Copy className="w-3 h-3 opacity-70 group-hover:opacity-100 text-pink-300 light:text-pink-600" />
            )}
          </button>

          <a
            href="#registro"
            className="hidden md:inline-flex items-center gap-1 font-semibold text-white/90 light:text-slate-800 hover:text-pink-400 light:hover:text-pink-600 transition-colors text-[11px]"
          >
            <span>Canjear ahora</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </aside>
  );
};
