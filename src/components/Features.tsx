import React from 'react';
import { 
  PackageCheck, 
  Droplets, 
  Flame, 
  Headphones, 
  Truck, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { FEATURES } from '../data/products';

export const Features: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'PackageCheck': return <PackageCheck className="w-5 h-5 text-pink-400" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-sky-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-indigo-400" />;
      case 'Truck': return <Truck className="w-5 h-5 text-teal-400" />;
      default: return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="garantias" className="py-16 sm:py-24 relative bg-[#100b25]/60 light:bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 light:text-emerald-700 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>🛡️ Calidad y Confianza</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white light:text-slate-900 tracking-tight">
            6 Razones para personalizar tu ropa con <span className="gradient-text-warm">SubliShop</span>
          </h2>
          <p className="mt-3 text-purple-200/80 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Hacemos cada prenda en nuestro propio taller con maquinaria de última generación y control artesanal para que el resultado sea impecable.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="glass-surface p-6 sm:p-7 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1d153d] light:bg-white shadow-xs border border-purple-500/30 light:border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getIcon(feature.icon)}
              </div>

              <h3 className="font-display font-bold text-lg text-white light:text-slate-900 mb-2 group-hover:text-pink-400 light:group-hover:text-pink-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-xs sm:text-sm text-purple-200/80 light:text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
