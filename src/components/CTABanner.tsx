import React, { useState } from 'react';
import { Sparkles, ArrowRight, MessageCircle, CheckCircle2, Copy, Check, Mail } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export const CTABanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Por favor, introduce un correo electrónico válido.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Persist in localStorage
      const existing = JSON.parse(localStorage.getItem('sublishop_leads') || '[]');
      existing.push({ email, date: new Date().toISOString(), origin: 'cta-banner', coupon: 'SUBLI15' });
      localStorage.setItem('sublishop_leads', JSON.stringify(existing));

      setIsSubmitting(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#ff2a5f', '#4f46e5', '#10b981', '#ff8c42']
        });
      } catch (err) {
        console.error(err);
      }

      toast.success('🚀 ¡Estás dentro! Te avisamos con tu 15 % dto.', {
        description: 'Usa el cupón SUBLI15 en cualquier pedido de ropa.'
      });
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('SUBLI15');
    setCopied(true);
    toast.success('Código SUBLI15 copiado');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-br from-[#120c2b] via-[#1a1238] to-[#26174a] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-purple-500/30">
          
          {/* Animated top and bottom rainbow edges */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bar-flow" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-pink-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-pink-500/40 text-pink-300 text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#ff2a5f]" />
              <span data-keep-white>✦ Cupón Exclusivo de Apertura</span>
            </div>

            <h2 data-keep-white className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1]">
              Consigue ahora tu <span className="gradient-text-warm">15% de Descuento</span> en tu primera prenda
            </h2>

            <p data-keep-white className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed">
              No esperes a que se agoten las plazas de apertura. Apúntate con tu correo y recibe tu código VIP aplicable a camisetas oversize, sudaderas y tote bags.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto pt-2">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-purple-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      data-keep-dark
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Introduce tu correo electrónico..."
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-purple-950/70 border border-purple-500/40 text-white text-sm placeholder:text-purple-300/60 focus:outline-none focus:ring-2 focus:ring-[#ff2a5f] focus:border-transparent transition-all shadow-inner"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-pulse px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#ff2a5f] to-[#ff4b78] hover:opacity-95 text-white font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    <span data-keep-white>{isSubmitting ? 'Validando...' : 'Obtener 15% DTO'}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
                <p data-keep-white className="text-[11px] text-purple-200/80 mt-2.5">
                  Sin letra pequeña. Te responderemos con tu cupón sin coste alguno.
                </p>
              </form>
            ) : (
              <div className="pt-2 max-w-md mx-auto space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-left">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-emerald-300 uppercase font-black">CÓDIGO ACTIVADO</span>
                      <p className="font-mono text-xl font-black text-white tracking-wider">SUBLI15</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>

                <a
                  href={`https://wa.me/34600000000?text=Hola%20SubliShop!%20Acabo%20de%20activar%20el%20cup%C3%B3n%20SUBLI15%20y%20quiero%20hacer%20un%20pedido%20de%20ropa%20personalizada.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Canjear por WhatsApp ahora mismo</span>
                </a>
              </div>
            )}

            {/* Direct WhatsApp Alternative */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Respuesta en menos de 2 horas
              </span>
              <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>O escríbenos directamente al WhatsApp +34 600 000 000</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
