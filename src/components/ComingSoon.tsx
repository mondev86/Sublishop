import React, { useState } from 'react';
import { 
  Sparkles, 
  Wind, 
  Footprints, 
  Shirt, 
  Compass, 
  ThumbsUp, 
  Bell, 
  Check 
} from 'lucide-react';
import { COMING_SOON_PRODUCTS, ComingSoonItem } from '../data/products';
import { toast } from 'sonner';

export const ComingSoon: React.FC = () => {
  const [votes, setVotes] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    COMING_SOON_PRODUCTS.forEach(p => {
      initial[p.id] = p.initialVotes;
    });
    return initial;
  });

  const [votedItems, setVotedItems] = useState<Record<string, boolean>>({});

  const handleVote = (item: ComingSoonItem) => {
    if (votedItems[item.id]) {
      toast.info(`Ya has votado por ${item.name}. ¡Gracias por ayudarnos a elegir la siguiente prenda!`);
      return;
    }
    setVotes(prev => ({ ...prev, [item.id]: prev[item.id] + 1 }));
    setVotedItems(prev => ({ ...prev, [item.id]: true }));
    toast.success(`🎉 ¡Voto registrado para ${item.name}!`, {
      description: 'Apúntate al registro para recibir un 15% DTO exclusivo cuando se lance.'
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind': return <Wind className="w-5 h-5 text-sky-500" />;
      case 'Footprints': return <Footprints className="w-5 h-5 text-indigo-500" />;
      case 'Shirt': return <Shirt className="w-5 h-5 text-pink-500" />;
      case 'Compass': return <Compass className="w-5 h-5 text-amber-500" />;
      default: return <Sparkles className="w-5 h-5 text-teal-500" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-[#110a26] light:bg-slate-100/90 text-white light:text-slate-900 border-y border-purple-500/25 light:border-slate-200 transition-colors">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/25 light:bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/20 light:bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 light:bg-pink-100 text-pink-400 light:text-pink-600 border border-purple-500/40 light:border-pink-300 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>✦ Próximos Lanzamientos Textil</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white light:text-slate-900 tracking-tight">
            Vota la siguiente prenda que <span className="gradient-text-warm">incorporaremos al taller</span>
          </h2>
          <p className="mt-3 text-purple-200/80 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Estamos preparando 5 nuevas prendas streetwear sublimables. Participa en la votación y sé el primero en estrenarlas con tu código de descuento.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {COMING_SOON_PRODUCTS.map((item) => {
            const hasVoted = !!votedItems[item.id];
            const currentVotes = votes[item.id];

            return (
              <div
                key={item.id}
                className="bg-[#181136]/90 light:bg-white border border-purple-500/30 light:border-slate-200/90 rounded-3xl p-5 flex flex-col justify-between hover:border-pink-500/50 hover:bg-[#1f1644] light:hover:bg-slate-50 transition-all duration-300 group shadow-lg"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#0e0922] light:bg-slate-100 border border-purple-500/30 light:border-slate-200 flex items-center justify-center">
                      {getIcon(item.iconName)}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-purple-950/80 light:bg-pink-100 text-pink-300 light:text-pink-600 text-[10px] font-bold border border-pink-500/30 light:border-transparent">
                      {item.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-purple-300/70 light:text-slate-500 uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-display font-bold text-base text-white light:text-slate-900 group-hover:text-pink-400 light:group-hover:text-pink-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-purple-200/70 light:text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-purple-500/20 light:border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-purple-300/70 light:text-slate-500">Llegada:</span>
                    <span className="text-emerald-400 light:text-emerald-600 font-bold">{item.expectedDate}</span>
                  </div>

                  {/* Interactive Vote Button */}
                  <button
                    onClick={() => handleVote(item)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      hasVoted
                        ? 'bg-emerald-500/20 light:bg-emerald-100 text-emerald-400 light:text-emerald-700 border border-emerald-500/40 light:border-emerald-300'
                        : 'bg-purple-950/60 light:bg-slate-100 hover:bg-pink-600 light:hover:bg-pink-600 text-purple-100 light:text-slate-800 light:hover:text-white border border-purple-500/40 light:border-slate-300 hover:border-pink-500'
                    }`}
                    aria-label={`Votar por ${item.name}`}
                  >
                    {hasVoted ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Voto registrado! ({currentVotes})</span>
                      </>
                    ) : (
                      <>
                        <ThumbsUp className="w-3.5 h-3.5 text-pink-400 group-hover:text-white" />
                        <span>Votar esta prenda ({currentVotes})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA link to register */}
        <div className="mt-12 text-center p-6 rounded-3xl bg-gradient-to-r from-[#170f36] to-[#26154b] light:from-slate-900 light:to-indigo-950 border border-purple-500/40 max-w-2xl mx-auto shadow-xl">
          <h4 data-keep-white className="font-display font-bold text-lg text-white mb-1">
            ¿Quieres enterarte el día exacto en que salgan a la venta?
          </h4>
          <p data-keep-white className="text-xs text-purple-200 mb-4">
            Los usuarios registrados en la apertura tendrán 48h de acceso prioritario y 15% de descuento directo.
          </p>
          <a
            href="#registro"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff2a5f] hover:bg-[#ff4b78] text-white text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4 text-white" />
            <span data-keep-white>Apuntarme a la lista VIP (-15% DTO)</span>
          </a>
        </div>

      </div>
    </section>
  );
};
