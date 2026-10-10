import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Tag, 
  MessageCircle, 
  Mail, 
  CheckCircle2, 
  Copy,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { ApparelMockup } from './ApparelMockup';

export const Hero: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [showcaseItem, setShowcaseItem] = useState<'tshirt-oversize' | 'tshirt-classic' | 'hoodie-hd' | 'tote-bag' | 'gymsack'>('tshirt-oversize');
  const [showcasePreset, setShowcasePreset] = useState<'cyberpunk' | 'anime' | 'streetwear' | 'minimal'>('cyberpunk');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Por favor, indica tu nombre.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      toast.error('Por favor, introduce un correo electrónico válido.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Save lead locally
      const existingLeads = JSON.parse(localStorage.getItem('sublishop_leads') || '[]');
      existingLeads.push({ name, email, date: new Date().toISOString(), coupon: 'SUBLI15' });
      localStorage.setItem('sublishop_leads', JSON.stringify(existingLeads));

      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff2a5f', '#4f46e5', '#10b981', '#ff8c42']
        });
      } catch (err) {
        console.error(err);
      }

      toast.success('🎉 ¡Apuntado/a! Tu código de 15% DTO ha sido activado.', {
        description: 'Usa el código SUBLI15 en tu primer pedido o menciónalo por WhatsApp.'
      });
    }, 400);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('SUBLI15');
    setCopiedCoupon(true);
    toast.success('Código SUBLI15 copiado');
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  return (
    <section id="registro" className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Decorative ambient lighting with midnight purple and pink glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-purple-600/30 via-[#1c133a]/60 to-pink-500/25 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & Lead Form (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[#ff2a5f] text-xs font-black tracking-wider uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#ff2a5f] animate-ping" />
              <span>🎨 Ropa & Streetwear Sublimado de Alta Definición</span>
            </div>

            {/* Main Fluid Headline */}
            <h1 className="font-display font-black tracking-tight text-white light:text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.05]">
              Viste tus diseños en ropa real.{' '}
              <span className="gradient-text-warm">
                Sin pedido mínimo,
              </span>{' '}
              de la pantalla a tu armario en 48h.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-purple-200/85 light:text-slate-600 max-w-2xl leading-relaxed">
              Camisetas clásicas, cortes <strong className="text-white light:text-slate-900 font-semibold">oversize streetwear heavy-cotton</strong>, sudaderas y tote bags de lona estampados con sublimación molecular. 
              Colores ultra vivos que no tienen tacto plástico, no se cuartean y duran lavado tras lavado.
            </p>

            {/* Benefit pills */}
            <div className="flex flex-wrap gap-2.5 pt-1 text-xs font-semibold text-purple-200 light:text-slate-700">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c143d]/80 light:bg-white/90 border border-purple-500/30 light:border-slate-200/80 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-pink-400" />
                Entrega en 48-72h
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c143d]/80 light:bg-white/90 border border-purple-500/30 light:border-slate-200/80 shadow-xs">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                Desde 1 sola unidad
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c143d]/80 light:bg-white/90 border border-purple-500/30 light:border-slate-200/80 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                Tintas Oeko-Tex® certificadas
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c143d]/80 light:bg-white/90 border border-purple-500/30 light:border-slate-200/80 shadow-xs">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                15% DTO en tu primera prenda
              </span>
            </div>

            {/* Lead Capture Form Card */}
            <div className="glass-surface p-6 sm:p-7 rounded-3xl shadow-xl relative overflow-hidden max-w-xl">
              {/* Subtle rainbow top line */}
              <div className="absolute top-0 left-0 right-0 h-1 bar-flow" />

              {!submitted ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="font-display font-black text-lg sm:text-xl text-white light:text-slate-900">
                        Consigue tu <span className="text-[#ff2a5f]">15% de descuento</span> de bienvenida
                      </h2>
                      <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5">
                        Apúntate en 5 segundos y recibe tu cupón directo para canjear en la web o por WhatsApp.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="hero-name" className="block text-xs font-semibold text-slate-300 light:text-slate-700 mb-1">
                          Tu nombre
                        </label>
                        <input
                          id="hero-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ej. Alex Gómez"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 light:bg-white border border-slate-700 light:border-slate-300 text-white light:text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2a5f] focus:border-transparent transition-all placeholder:text-slate-500 light:placeholder:text-slate-400 shadow-inner"
                        />
                      </div>

                      <div>
                        <label htmlFor="hero-email" className="block text-xs font-semibold text-slate-300 light:text-slate-700 mb-1">
                          Tu email
                        </label>
                        <input
                          id="hero-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@correo.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 light:bg-white border border-slate-700 light:border-slate-300 text-white light:text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2a5f] focus:border-transparent transition-all placeholder:text-slate-500 light:placeholder:text-slate-400 shadow-inner"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-pulse w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#ff2a5f] via-[#ff4b78] to-[#ff8c42] hover:opacity-95 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Activando tu descuento...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Reclamar mi 15% DTO + Código de Apertura</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-slate-400 light:text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                      <span>🔒 Cero spam. Datos protegidos y cancelación en 1 clic.</span>
                    </p>
                  </form>
                </div>
              ) : (
                /* Unlocked Voucher State */
                <div className="py-2 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-display font-black text-xl text-white light:text-slate-900">
                      ¡Genial {name}! Tu código ya está activo
                    </h2>
                    <p className="text-xs text-slate-300 light:text-slate-600 mt-1">
                      Hemos enviado una confirmación a <strong>{email}</strong>. Puedes usarlo ahora mismo:
                    </p>
                  </div>

                  <div className="p-3 bg-pink-950/40 light:bg-pink-50/80 border-2 border-dashed border-[#ff2a5f]/50 rounded-2xl flex items-center justify-between max-w-sm mx-auto">
                    <div className="text-left">
                      <span className="text-[10px] uppercase font-bold text-pink-400 light:text-pink-600 tracking-wider">CÓDIGO DE BIENVENIDA</span>
                      <p className="font-mono text-xl font-black text-[#ff2a5f] tracking-widest">SUBLI15</p>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#ff2a5f] hover:bg-[#ff4b78] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      {copiedCoupon ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCoupon ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/34600000000?text=Hola%20SubliShop!%20Soy%20${encodeURIComponent(name)}%2C%20acabo%20de%20registrarme%20con%20el%20cup%C3%B3n%20SUBLI15%20y%20quiero%20hacer%20un%20pedido%20de%20ropa.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 light:text-emerald-700 bg-emerald-950/60 light:bg-emerald-100 hover:bg-emerald-900/60 light:hover:bg-emerald-200 border border-emerald-500/30 px-4 py-2 rounded-xl transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Pedir por WhatsApp ahora</span>
                    </a>
                    <a
                      href="#productos"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 light:text-slate-700 hover:text-white light:hover:text-slate-900 px-4 py-2"
                    >
                      <span>Ver catálogo de ropa ↓</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Contact Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 light:text-slate-600 pt-1">
              <span className="font-medium text-slate-400 light:text-slate-500">¿Prefieres trato directo?</span>
              <a
                href="https://wa.me/34600000000?text=Hola%20SubliShop!%20Tengo%20preguntas%20sobre%20la%20ropa%20sublimada."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 light:text-emerald-700 hover:underline font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>+34 600 000 000 (WhatsApp)</span>
              </a>
              <span className="text-slate-600 light:text-slate-300">·</span>
              <a
                href="mailto:hola@sublishop.es"
                className="inline-flex items-center gap-1 text-slate-300 light:text-slate-700 hover:text-pink-400 font-semibold"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>hola@sublishop.es</span>
              </a>
            </div>

            {/* 4 KPIs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-purple-500/20 light:border-slate-200">
              <div className="p-3.5 rounded-2xl bg-[#1c143d]/70 light:bg-white/80 border border-purple-500/30 light:border-slate-200/80 shadow-xs">
                <span className="block text-2xl font-black text-white light:text-slate-900 font-display">48h</span>
                <span className="text-xs text-purple-200/80 light:text-slate-500 font-medium leading-tight">Entrega express</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#1c143d]/70 light:bg-white/80 border border-purple-500/30 light:border-slate-200/80 shadow-xs">
                <span className="block text-2xl font-black text-white light:text-slate-900 font-display">1 ud.</span>
                <span className="text-xs text-purple-200/80 light:text-slate-500 font-medium leading-tight">Pedido mínimo</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#1c143d]/70 light:bg-white/80 border border-purple-500/30 light:border-slate-200/80 shadow-xs">
                <span className="block text-2xl font-black text-[#ff2a5f] font-display">100%</span>
                <span className="text-xs text-purple-200/80 light:text-slate-500 font-medium leading-tight">Colores vivos sin agrietar</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#1c143d]/70 light:bg-white/80 border border-purple-500/30 light:border-slate-200/80 shadow-xs">
                <span className="block text-2xl font-black text-purple-400 light:text-indigo-600 font-display">-15%</span>
                <span className="text-xs text-purple-200/80 light:text-slate-500 font-medium leading-tight">Descuento apertura</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800 light:ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                  alt="Cliente SubliShop"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800 light:ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                  alt="Cliente SubliShop"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800 light:ring-white object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80"
                  alt="Cliente SubliShop"
                />
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 text-white flex items-center justify-center text-[10px] font-black ring-2 ring-slate-800 light:ring-white">
                  +120
                </div>
              </div>
              <div className="text-xs text-slate-300 light:text-slate-600">
                <div className="flex items-center text-amber-400">
                  {'★★★★★'}
                  <span className="ml-1 text-white light:text-slate-800 font-bold">5.0 / 5</span>
                </div>
                <p className="text-slate-400 light:text-slate-500 font-medium">+120 personas ya apuntadas para la apertura</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Apparel Showcase (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="glass-surface p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
              
              {/* Header inside showcase */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 light:border-slate-200">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-pink-400">
                    ✦ PROBADOR VISUAL
                  </span>
                  <h3 className="font-display font-bold text-sm text-white light:text-slate-900">
                    Acabado Textil Sublimado
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  Zero-Tacto Plástico
                </span>
              </div>

              {/* Garment Selector */}
              <div className="grid grid-cols-5 gap-1 py-3 text-[10px] sm:text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setShowcaseItem('tshirt-oversize');
                    setShowcasePreset('cyberpunk');
                  }}
                  className={`py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                    showcaseItem === 'tshirt-oversize'
                      ? 'bg-pink-600 text-white border-pink-500 shadow-sm'
                      : 'bg-slate-800/80 light:bg-white/80 hover:bg-slate-700 light:hover:bg-slate-100 text-slate-300 light:text-slate-700 border-slate-700 light:border-slate-200'
                  }`}
                >
                  Oversize
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowcaseItem('tshirt-classic');
                    setShowcasePreset('streetwear');
                  }}
                  className={`py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                    showcaseItem === 'tshirt-classic'
                      ? 'bg-pink-600 text-white border-pink-500 shadow-sm'
                      : 'bg-slate-800/80 light:bg-white/80 hover:bg-slate-700 light:hover:bg-slate-100 text-slate-300 light:text-slate-700 border-slate-700 light:border-slate-200'
                  }`}
                >
                  Clásica
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowcaseItem('hoodie-hd');
                    setShowcasePreset('anime');
                  }}
                  className={`py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                    showcaseItem === 'hoodie-hd'
                      ? 'bg-pink-600 text-white border-pink-500 shadow-sm'
                      : 'bg-slate-800/80 light:bg-white/80 hover:bg-slate-700 light:hover:bg-slate-100 text-slate-300 light:text-slate-700 border-slate-700 light:border-slate-200'
                  }`}
                >
                  Hoodie
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowcaseItem('tote-bag');
                    setShowcasePreset('minimal');
                  }}
                  className={`py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                    showcaseItem === 'tote-bag'
                      ? 'bg-pink-600 text-white border-pink-500 shadow-sm'
                      : 'bg-slate-800/80 light:bg-white/80 hover:bg-slate-700 light:hover:bg-slate-100 text-slate-300 light:text-slate-700 border-slate-700 light:border-slate-200'
                  }`}
                >
                  Tote
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowcaseItem('gymsack');
                    setShowcasePreset('cyberpunk');
                  }}
                  className={`py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                    showcaseItem === 'gymsack'
                      ? 'bg-pink-600 text-white border-pink-500 shadow-sm'
                      : 'bg-slate-800/80 light:bg-white/80 hover:bg-slate-700 light:hover:bg-slate-100 text-slate-300 light:text-slate-700 border-slate-700 light:border-slate-200'
                  }`}
                >
                  Mochila
                </button>
              </div>

              {/* Graphic Mockup Area */}
              <div className="relative py-4 flex items-center justify-center min-h-[340px] rounded-2xl bg-gradient-to-b from-slate-900/50 to-slate-950/50 light:from-slate-100/50 light:to-slate-200/50 border border-slate-800/60 light:border-slate-200/60">
                <ApparelMockup
                  type={showcaseItem}
                  artPreset={showcasePreset}
                  colorHex="#FFFFFF"
                  className="w-full max-w-[320px] h-[340px] transition-all duration-300"
                />
              </div>

              {/* Art Style switcher */}
              <div className="pt-3 border-t border-slate-800 light:border-slate-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400 light:text-slate-500 text-[11px]">Estilo:</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowcasePreset('cyberpunk')}
                    className={`px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                      showcasePreset === 'cyberpunk'
                        ? 'bg-pink-500 text-white'
                        : 'bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    Cyber
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowcasePreset('anime')}
                    className={`px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                      showcasePreset === 'anime'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    Anime
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowcasePreset('streetwear')}
                    className={`px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                      showcasePreset === 'streetwear'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    Acid Street
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowcasePreset('minimal')}
                    className={`px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                      showcasePreset === 'minimal'
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    Minimal
                  </button>
                </div>
              </div>

              {/* Live customizer link banner */}
              <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between shadow-md border border-slate-800">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-pink-400">¿Quieres subir tu propio logo?</span>
                  <p className="text-xs font-semibold text-slate-200">Prueba el personalizador en vivo</p>
                </div>
                <a
                  href="#personalizador"
                  className="px-3 py-1.5 rounded-lg bg-pink-500 hover:bg-pink-600 text-white text-[11px] font-bold transition-colors shadow-xs"
                >
                  Probar gratis →
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
