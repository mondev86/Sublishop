/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Topbar } from './components/Topbar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { ProductsGrid } from './components/ProductsGrid';
import { SublimationCustomizer } from './components/SublimationCustomizer';
import { ComingSoon } from './components/ComingSoon';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { CTABanner } from './components/CTABanner';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { StripeCheckoutModal } from './components/StripeCheckoutModal';
import { Product } from './data/products';

function AppContent() {
  const { theme } = useTheme();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Compute live cart totals with welcome discount
  const subtotal = cartItems.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
  const discountAmount = subtotal * 0.15;
  const shipping = subtotal - discountAmount >= 35 || subtotal === 0 ? 0 : 4.95;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleSelectProduct = (product: Product, size: string, color: string) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        it => it.product.id === product.id && it.size === size && it.color === color
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [
        ...prev,
        {
          id: `${product.id}-${Date.now()}`,
          product,
          size,
          color,
          quantity: 1
        }
      ];
    });

    toast.success(`👕 ¡${product.name} añadida a tu pedido!`, {
      description: `Talla ${size} · Base ${color}. 15% DTO disponible con código SUBLI15.`
    });

    setIsCartOpen(true);
  };

  const handleQuickCheckout = (product: Product, size: string, color: string) => {
    handleSelectProduct(product, size, color);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOpenStripeCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== index));
    toast.info('Prenda eliminada del pedido');
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCartItems(prev => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty > 0) {
        next[index].quantity = newQty;
      }
      return next;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-[#ff2a5f] selection:text-white transition-colors duration-300">
      {/* Sonner Toast Notification Center with reactive theme */}
      <Toaster 
        theme={theme}
        richColors 
        position="top-right" 
        closeButton 
        toastOptions={{
          style: {
            fontFamily: 'Inter, sans-serif',
            borderRadius: '16px',
            fontSize: '13px'
          }
        }} 
      />

      {/* 1. Topbar */}
      <Topbar />

      {/* 2. Navbar with theme switcher */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} cartCount={totalCartCount} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 3. Hero (Proposition + Lead capture + Apparel Showcase) */}
        <Hero />

        {/* 4. MarqueeStrip */}
        <MarqueeStrip />

        {/* 5. ProductsGrid (Streetwear & Apparel Catalog) */}
        <ProductsGrid onSelectProduct={handleSelectProduct} />

        {/* Interactive Real-Time Customizer & Fabric Science */}
        <SublimationCustomizer 
          onAddToCart={handleSelectProduct}
          onQuickCheckout={handleQuickCheckout}
        />

        {/* 6. Coming Soon (Future Apparel with Interactive Voting) */}
        <ComingSoon />

        {/* 7. How It Works (Order in 3 Steps) */}
        <HowItWorks />

        {/* 8. Features & Guarantees (6 Reasons) */}
        <Features />

        {/* 9. Testimonials (5★ Verified Reviews) */}
        <Testimonials />

        {/* 10. CTABanner (Final Discount Voucher Capture) */}
        <CTABanner />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Direct WhatsApp Floating Bubble */}
      <WhatsAppFloating />

      {/* Cart & Quote Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onOpenStripeCheckout={handleOpenStripeCheckout}
      />

      {/* Stripe Checkout & Payment Gateway Modal */}
      <StripeCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        discountAmount={discountAmount}
        shipping={shipping}
        total={total}
        onPaymentSuccess={(orderId) => {
          handleClearCart();
          setIsCheckoutOpen(false);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
