import React from 'react';
import { Shirt, Flame, PackageCheck, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Elige tu prenda y sube tu diseño',
      subtitle: 'Desde 1 sola unidad o tiradas para tu marca',
      description: 'Selecciona tu corte favorito (Oversize 220g, Clásica, Hoodie o Tote bag). Sube tu ilustración, logo o foto. Si tienes dudas con la calidad, nuestro equipo te ayuda gratis a optimizar el archivo.',
      icon: <Shirt className="w-6 h-6 text-pink-400" />,
      detail: 'Formatos aceptados: PNG, JPG, PDF, SVG, AI. Revisión de resolución a 300 DPI incluida.'
    },
    {
      number: '02',
      title: 'Fusión térmica molecular a 200°C',
      subtitle: 'Tecnología de sublimación HD sin plásticos',
      description: 'Imprimimos con tintas de dispersión Oeko-Tex® en papel transfer y aplicamos calor y presión controlada. La tinta se gasifica y se integra molecularmente en el polímero del tejido. Cero tacto rugoso, 100% transpirable.',
      icon: <Flame className="w-6 h-6 text-orange-400" />,
      detail: 'Inmortal a la lavadora: no se cuartea, no se decolora, ni se despega jamás.'
    },
    {
      number: '03',
      title: 'Control de calidad y entrega en 48h',
      subtitle: 'De nuestro taller directo a tu puerta',
      description: 'Revisamos minuciosamente cada costura, simetría y fidelidad cromática. Empaquetamos con protección ecológica y te enviamos el número de seguimiento express en tiempo real.',
      icon: <PackageCheck className="w-6 h-6 text-teal-400" />,
      detail: 'Envío gratis a partir de 35€. Garantía de reposición inmediata si no queda perfecto.'
    }
  ];

  return (
    <section id="como-funciona" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-[#ff2a5f] text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>⚡ Proceso Sencillo y Rápido</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white light:text-slate-900 tracking-tight">
            Tu ropa personalizada en <span className="gradient-text-warm">3 sencillos pasos</span>
          </h2>
          <p className="mt-3 text-purple-200/80 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Sin complicaciones técnicas ni intermediarios. Desde el archivo en tu teléfono u ordenador hasta una prenda de calidad lista para salir a la calle.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((step) => (
            <div
              key={step.number}
              className="glass-surface p-7 sm:p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Step number watermark */}
              <div className="absolute top-4 right-5 text-4xl sm:text-5xl font-black font-display text-purple-900/40 light:text-slate-200 select-none group-hover:text-pink-500/20 light:group-hover:text-pink-200 transition-colors">
                {step.number}
              </div>

              <div>
                {/* Icon box */}
                <div className="w-12 h-12 rounded-2xl bg-[#1d153d] light:bg-white shadow-sm border border-purple-500/30 light:border-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>

                <span className="text-[11px] font-bold text-pink-400 light:text-pink-600 uppercase tracking-wider block mb-1">
                  {step.subtitle}
                </span>

                <h3 className="font-display font-bold text-xl text-white light:text-slate-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-xs text-purple-200/80 light:text-slate-600 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              {/* Technical footnote */}
              <div className="pt-4 border-t border-purple-500/20 light:border-slate-100 flex items-start gap-2 text-[11px] text-purple-300/70 light:text-slate-500 font-medium">
                <HelpCircle className="w-3.5 h-3.5 text-pink-400 light:text-slate-400 shrink-0 mt-0.5" />
                <span>{step.detail}</span>
              </div>
            </div>
          ))}

        </div>

        {/* Help Banner */}
        <div className="mt-12 p-6 rounded-3xl glass-surface shadow-sm max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-display font-bold text-base text-white light:text-slate-900">
              ¿No tienes tu diseño listo o necesitas ayuda con el logo?
            </h4>
            <p className="text-xs text-purple-200/80 light:text-slate-600 mt-0.5">
              Envíanos lo que tengas por WhatsApp y nuestro diseñador lo prepara para impresión sin coste.
            </p>
          </div>
          <a
            href="https://wa.me/34600000000?text=Hola%20SubliShop!%20Necesito%20ayuda%20para%20adaptar%20mi%20dise%C3%B1o%20a%20una%20camiseta."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold transition-colors flex items-center gap-2"
          >
            <span data-keep-white>Pedir ayuda gratis</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </a>
        </div>

      </div>
    </section>
  );
};
