import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 select-none">
      {/* Tooltip message */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200/80 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-[220px]">
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>¿Dudas con tu prenda?</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
              Escríbenos por WhatsApp y te asesoramos en directo.
            </p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
            aria-label="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href="https://wa.me/34600000000?text=Hola%20SubliShop!%20Tengo%20preguntas%20sobre%20la%20ropa%20sublimada%20y%20el%2015%25%20de%20descuento."
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group relative focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
        aria-label="Chat directo de WhatsApp con SubliShop"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-pink-500 border-2 border-white" />
      </a>
    </div>
  );
};
