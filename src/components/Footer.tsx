import React, { useState } from 'react';
import { Shirt, MessageCircle, Mail, MapPin, Clock, ArrowUp, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0e0922] text-white border-t border-purple-500/25 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative top rainbow accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bar-flow opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-purple-500/20">
          
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1a1a24] to-[#4f46e5] flex items-center justify-center text-white shadow-md">
                <Shirt className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-tight text-white">
                  Subli<span className="gradient-text-warm">Shop</span>
                </span>
                <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-pink-500/20 text-pink-400">
                  Textil 2026
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Taller especializado en ropa y moda streetwear personalizada con tecnología de sublimación molecular. 
              Prendas de tacto algodón suave, cero residuo plástico y máxima durabilidad.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Taller activo
              </span>
              <span>·</span>
              <span>Envíos a toda España</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-pink-400">
              Prendas & Catálogo
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <a href="#productos" className="hover:text-white transition-colors">
                  Camisetas Clásicas (16,99 €)
                </a>
              </li>
              <li>
                <a href="#productos" className="hover:text-white transition-colors">
                  Camisetas Oversize 220g (21,99 €)
                </a>
              </li>
              <li>
                <a href="#productos" className="hover:text-white transition-colors">
                  Sudaderas Hoodie HD (34,99 €)
                </a>
              </li>
              <li>
                <a href="#productos" className="hover:text-white transition-colors">
                  Tote Bags de Lona (12,99 €)
                </a>
              </li>
              <li>
                <a href="#personalizador" className="hover:text-white transition-colors">
                  Probador Textil en Vivo
                </a>
              </li>
            </ul>
          </div>

          {/* Service Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-indigo-400">
              Información & Ayuda
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <a href="#como-funciona" className="hover:text-white transition-colors">
                  Cómo funciona el pedido
                </a>
              </li>
              <li>
                <a href="#garantias" className="hover:text-white transition-colors">
                  Garantías y Tintas Oeko-Tex®
                </a>
              </li>
              <li>
                <a href="#opiniones" className="hover:text-white transition-colors">
                  Opiniones de Clientes (5★)
                </a>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal('envios')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Envíos 48-72h y Devoluciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal('cuidados')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Guía de Lavado y Cuidado
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-emerald-400">
              Contacto Directo
            </h4>
            <div className="text-xs space-y-2.5 text-slate-400">
              <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+34 600 000 000 (WhatsApp)</span>
              </a>
              <a
                href="mailto:hola@sublishop.es"
                className="flex items-center gap-2 hover:text-pink-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-pink-400 shrink-0" />
                <span>hola@sublishop.es</span>
              </a>
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Lunes a Viernes · 09:00 a 19:00</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Taller Textil · España</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Legal links & Payment methods */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SubliShop. Todos los derechos reservados. Ropa sublimada personalizada.</p>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setLegalModal('aviso')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Aviso Legal
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalModal('privacidad')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacidad
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalModal('cookies')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookies
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors ml-2"
              title="Volver arriba"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Legal & Info Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#15102a] border border-purple-500/40 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              aria-label="Cerrar modal informativo"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-pink-400 mb-2 text-xs font-bold uppercase">
              <Shield className="w-4 h-4" />
              <span data-keep-white>Información Oficial SubliShop</span>
            </div>

            <h3 data-keep-white className="font-display font-black text-xl text-white mb-4">
              {legalModal === 'envios' && 'Envíos Express 48-72h & Devoluciones'}
              {legalModal === 'cuidados' && 'Guía de Lavado & Cuidado de Prendas'}
              {legalModal === 'aviso' && 'Aviso Legal'}
              {legalModal === 'privacidad' && 'Política de Privacidad'}
              {legalModal === 'cookies' && 'Política de Cookies'}
            </h3>

            <div data-keep-white className="text-xs text-slate-200 space-y-3 leading-relaxed max-h-60 overflow-y-auto pr-2">
              {legalModal === 'envios' && (
                <>
                  <p>
                    <strong>Tiempos de producción:</strong> Fabricamos y estampamos cada prenda bajo demanda en 24-48 horas laborables.
                  </p>
                  <p>
                    <strong>Transporte express:</strong> Envíos peninsulares con entrega en 24-48h con seguimiento directo por WhatsApp o SMS. Gratis en pedidos superiores a 35€.
                  </p>
                  <p>
                    <strong>Garantía de reposición:</strong> Si tu prenda presenta cualquier defecto de sublimación o error de confección, te la reponemos de inmediato sin coste.
                  </p>
                </>
              )}

              {legalModal === 'cuidados' && (
                <>
                  <p>
                    <strong>Lavado:</strong> Lavar a máquina a máximo 30°C con colores similares. La sublimación no destiñe ni pierde intensidad.
                  </p>
                  <p>
                    <strong>Planchado:</strong> Puedes planchar directamente sobre el estampado sin miedo a que se pegue o se dañe la plancha, ya que no contiene tintas plásticas ni relieve de vinilo.
                  </p>
                  <p>
                    <strong>Lejía:</strong> No utilizar lejía ni blanqueadores clorados para preservar la vida del hilo textil.
                  </p>
                </>
              )}

              {legalModal === 'aviso' && (
                <>
                  <p>
                    SubliShop opera como taller y tienda de personalización textil. Los logotipos y diseños aportados por los clientes son responsabilidad del titular para su uso lícito.
                  </p>
                  <p>
                    Contacto fiscal y de soporte: hola@sublishop.es · Teléfono / WhatsApp: +34 600 000 000.
                  </p>
                </>
              )}

              {legalModal === 'privacidad' && (
                <>
                  <p>
                    En SubliShop nos tomamos muy en serio tu privacidad. Tu correo y nombre se utilizan exclusivamente para enviarte tu cupón promocional del 15% y gestionar tus pedidos de ropa.
                  </p>
                  <p>
                    Nunca venderemos tus datos a terceros. Puedes darte de baja en cualquier momento con un solo clic.
                  </p>
                </>
              )}

              {legalModal === 'cookies' && (
                <>
                  <p>
                    Utilizamos almacenamiento local básico únicamente para recordar tu cupón de descuento y guardar tus prendas favoritas en esta sesión.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
