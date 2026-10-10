import React from 'react';
import { Sparkles, Star, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const Testimonials: React.FC = () => {
  return (
    <section id="opiniones" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 light:text-amber-800 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>⭐ Prueba Social Verificada</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white light:text-slate-900 tracking-tight">
            Lo que dicen quienes ya visten <span className="gradient-text-warm">SubliShop</span>
          </h2>
          <p className="mt-3 text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Opiniones de creadores, marcas emergentes e ilustradores que ya han confiado en nuestro servicio de estampación textil.
          </p>
        </div>

        {/* Testimonials 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="glass-surface p-7 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* 5 Stars Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#fbbf24]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 light:text-slate-600">{item.date}</span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-purple-100/90 light:text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-purple-500/20 light:border-slate-100/90 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-pink-500/40"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display font-bold text-sm text-white light:text-slate-900 truncate">
                      {item.name}
                    </h4>
                    <span className="inline-flex items-center text-emerald-400 text-[10px] font-bold" title="Compra verificada">
                      <CheckCircle className="w-3.5 h-3.5 fill-emerald-500/20 text-emerald-400" />
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-300/70 light:text-slate-600 truncate">
                    {item.city} · <span className="text-pink-400 light:text-pink-600 font-semibold">{item.productBought}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
