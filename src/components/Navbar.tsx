import React, { useState, useEffect } from 'react';
import { Shirt, MessageCircle, Menu, X, Sparkles, ShoppingBag, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenCart?: () => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart, cartCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled ? 'glass-nav py-3' : 'bg-nav-bg/90 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-lg">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1a1a24] to-[#4f46e5] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Shirt className="w-5 h-5 text-pink-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff2a5f]"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xl tracking-tight text-slate-100 light:text-slate-900 group-hover:text-pink-500 transition-colors">
                Subli<span className="gradient-text-warm">Shop</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-pink-500/20 text-[#ff2a5f] border border-pink-500/30">
                Textil
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400 light:text-slate-500 tracking-wide">
              Ropa & Streetwear Personalizado
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300 light:text-slate-700">
          <a
            href="#productos"
            className="hover:text-[#ff2a5f] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1 py-0.5"
          >
            Prendas & Catálogo
          </a>
          <a
            href="#personalizador"
            className="hover:text-[#ff2a5f] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1 py-0.5"
          >
            Pruébalo en Vivo
          </a>
          <a
            href="#como-funciona"
            className="hover:text-[#ff2a5f] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1 py-0.5"
          >
            Cómo Funciona
          </a>
          <a
            href="#garantias"
            className="hover:text-[#ff2a5f] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1 py-0.5"
          >
            Garantías
          </a>
          <a
            href="#opiniones"
            className="hover:text-[#ff2a5f] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-1 py-0.5"
          >
            Opiniones (5★)
          </a>
        </div>

        {/* Right Actions: Theme Toggle, WhatsApp & CTA button */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Theme Toggle Button (Dark default, Light secondary) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-300 light:text-slate-700 hover:text-pink-400 hover:bg-slate-800/60 light:hover:bg-slate-200/60 transition-all border border-slate-700/60 light:border-slate-300/80 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro (por defecto)'}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-[11px] text-slate-300">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-500" />
                <span className="text-[11px] text-slate-700">Oscuro</span>
              </>
            )}
          </button>

          {/* Quick WhatsApp Link */}
          <a
            href="https://wa.me/34600000000?text=Hola%20SubliShop!%20Quiero%20personalizar%20ropa%20con%20el%2015%25%20de%20descuento%20de%20apertura."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-400 light:text-emerald-800 bg-emerald-950/60 light:bg-emerald-50 hover:bg-emerald-900/60 light:hover:bg-emerald-100 border border-emerald-500/30 light:border-emerald-200 transition-all shadow-xs"
            aria-label="Contactar por WhatsApp directo"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="hidden xl:inline">WhatsApp</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] text-emerald-400">&lt;2h</span>
          </a>

          {/* Cart / Checkout trigger */}
          {onOpenCart && (
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-300 light:text-slate-700 hover:text-pink-400 hover:bg-[#201548] light:hover:bg-slate-200/60 transition-colors border border-purple-500/30 light:border-slate-300/80 cursor-pointer"
              aria-label="Abrir cesta y pagar"
            >
              <ShoppingBag className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-bold text-white light:text-slate-800 hidden md:inline">
                {cartCount > 0 ? 'Pagar Pedido' : 'Cesta'}
              </span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#ff2a5f] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Primary CTA button to registration anchor */}
          <a
            href="#registro"
            className="btn-pulse inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ff2a5f] to-[#ff4b78] hover:opacity-95 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-200" />
            <span>Acceso anticipado (-15%)</span>
          </a>
        </div>

        {/* Mobile Actions: Theme Toggle & Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-300 light:text-slate-700 border border-slate-700/60 light:border-slate-300"
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {onOpenCart && (
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl text-slate-300 light:text-slate-700 border border-slate-700/60 light:border-slate-300"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ff2a5f] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-slate-300 light:text-slate-800 hover:bg-slate-800 light:hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="sm:hidden glass-surface border-t border-slate-800 light:border-slate-200 mt-2 px-5 py-6 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3 font-medium text-slate-200 light:text-slate-800">
            <a
              href="#productos"
              onClick={closeMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-800 light:hover:bg-slate-100 hover:text-pink-400 transition-colors"
            >
              👕 Prendas de ropa & Catálogo
            </a>
            <a
              href="#personalizador"
              onClick={closeMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-800 light:hover:bg-slate-100 hover:text-pink-400 transition-colors"
            >
              🎨 Probador y personalizador en vivo
            </a>
            <a
              href="#como-funciona"
              onClick={closeMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-800 light:hover:bg-slate-100 hover:text-pink-400 transition-colors"
            >
              ⚡ Cómo funciona (en 3 pasos)
            </a>
            <a
              href="#garantias"
              onClick={closeMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-800 light:hover:bg-slate-100 hover:text-pink-400 transition-colors"
            >
              🛡️ 6 Razones para elegirnos
            </a>
            <a
              href="#opiniones"
              onClick={closeMenu}
              className="py-2 px-3 rounded-lg hover:bg-slate-800 light:hover:bg-slate-100 hover:text-pink-400 transition-colors"
            >
              ⭐ Opiniones de clientes
            </a>
          </div>

          <div className="pt-3 border-t border-slate-800 light:border-slate-200 space-y-2">
            <a
              href="https://wa.me/34600000000?text=Hola%20SubliShop!%20Quiero%20personalizar%20ropa%20con%20el%2015%25%20de%20descuento%20de%20apertura."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar por WhatsApp (&lt;2h)</span>
            </a>

            <a
              href="#registro"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#ff2a5f] to-[#ff4b78] text-white font-bold text-xs shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-pink-200" />
              <span>Conseguir 15% DTO de bienvenida</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
