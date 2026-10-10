import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Tag, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle,
  Truck,
  CreditCard,
  Lock
} from 'lucide-react';
import { Product } from '../data/products';
import { REAL_MOCKUPS } from '../assets/mockupImages';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  customNotes?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, delta: number) => void;
  onClearCart: () => void;
  onOpenStripeCheckout: (discountAmount: number, shipping: number, total: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  onOpenStripeCheckout
}) => {
  const [couponCode, setCouponCode] = useState('SUBLI15');
  const [discountApplied, setDiscountApplied] = useState(true);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = discountApplied ? subtotal * 0.15 : 0;
  const shipping = subtotal > 35 || items.length === 0 ? 0 : 3.95;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SUBLI15') {
      setDiscountApplied(true);
      toast.success('¡Cupón SUBLI15 aplicado! 15% de descuento descontado.');
    } else {
      toast.error('Código no válido. Prueba con SUBLI15.');
    }
  };

  const handleCheckoutViaWhatsApp = () => {
    if (items.length === 0) return;

    const itemsSummary = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.product.name} (Talla: ${it.size}, Color: ${it.color}, Cantidad: ${it.quantity}) - ${(
            it.product.price * it.quantity
          ).toFixed(2)}€`
      )
      .join('\n');

    const message = `Hola SubliShop! Quiero encargar este pedido de ropa personalizada:\n\n${itemsSummary}\n\nSubtotal: ${subtotal.toFixed(
      2
    )}€\nDescuento 15% (SUBLI15): -${discountAmount.toFixed(2)}€\nEnvío: ${
      shipping === 0 ? 'GRATIS' : `${shipping.toFixed(2)}€`
    }\nTOTAL: ${total.toFixed(2)}€\n\n¿Por dónde os envío los archivos de diseño para estampar?`;

    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-[#150f2f] light:bg-white text-white light:text-slate-900 h-full shadow-2xl flex flex-col justify-between border-l border-purple-500/25 light:border-slate-200 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-purple-500/20 light:border-slate-100 flex items-center justify-between bg-[#110a26]/90 light:bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-[#ff2a5f] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white light:text-slate-900">
                Tu Selección de Prendas
              </h3>
              <p className="text-[11px] text-purple-200/70 light:text-slate-500">
                {items.length === 0 ? 'Sin artículos' : `${items.length} modelo(s) personalizado(s)`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-purple-200/70 hover:text-white light:hover:text-slate-600 hover:bg-[#201546] light:hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Cerrar pedido"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#1c143d] light:bg-slate-100 text-purple-300 light:text-slate-400 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-white light:text-slate-700">Tu bolsa está vacía</p>
              <p className="text-xs text-purple-200/70 light:text-slate-500 max-w-xs mx-auto">
                Elige una camiseta, sudadera o tote bag del catálogo para personalizarla con tu diseño.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-bold hover:bg-pink-700 transition-colors cursor-pointer"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="p-3.5 rounded-2xl bg-[#1c143d]/80 light:bg-slate-50 border border-purple-500/25 light:border-slate-200/80 flex items-start gap-3 relative group"
              >
                <div className="w-16 h-16 rounded-xl bg-[#100a26] light:bg-white border border-purple-500/30 light:border-slate-200 overflow-hidden shrink-0">
                  <img
                    src={REAL_MOCKUPS[item.product.image] || REAL_MOCKUPS['tshirt-oversize']}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="font-display font-bold text-xs text-white light:text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="text-purple-300/70 hover:text-rose-400 transition-colors p-1"
                      aria-label="Eliminar prenda"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-purple-200/70 light:text-slate-500 mt-0.5 space-x-2">
                    <span>Talla: <strong className="text-white light:text-slate-800">{item.size}</strong></span>
                    <span>·</span>
                    <span>Base: <strong className="text-white light:text-slate-800">{item.color}</strong></span>
                  </div>

                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center border border-purple-500/30 light:border-slate-200 rounded-lg bg-[#100a26] light:bg-white">
                      <button
                        onClick={() => onUpdateQuantity(index, -1)}
                        className="px-2 py-0.5 text-xs text-purple-200 light:text-slate-600 hover:bg-[#251b54] light:hover:bg-slate-100 rounded-l"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-bold text-white light:text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, 1)}
                        className="px-2 py-0.5 text-xs text-purple-200 light:text-slate-600 hover:bg-[#251b54] light:hover:bg-slate-100 rounded-r"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono text-xs font-black text-pink-400 light:text-slate-900">
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-800 light:border-slate-200 bg-slate-950/70 light:bg-slate-50/70 space-y-3">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Cupón de descuento"
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#100a26] light:bg-white border border-purple-500/30 light:border-slate-200 text-xs font-mono font-bold uppercase text-white light:text-slate-900 focus:ring-2 focus:ring-[#ff2a5f] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-[#201546] hover:bg-[#2c1d60] light:bg-slate-900 text-white text-xs font-bold transition-colors cursor-pointer border border-purple-500/30 light:border-transparent"
              >
                Aplicar
              </button>
            </form>

            {discountApplied && (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 light:text-emerald-700 bg-emerald-500/15 light:bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 light:border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>15% DTO de bienvenida aplicado (-{discountAmount.toFixed(2)} €)</span>
              </div>
            )}

            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-purple-200/80 light:text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-white light:text-slate-900">{subtotal.toFixed(2)} €</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-pink-400 light:text-pink-600 font-bold">
                  <span>Descuento de apertura (-15%):</span>
                  <span>-{discountAmount.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-purple-300/70 light:text-slate-400" />
                  <span>Envío:</span>
                </span>
                <span className={shipping === 0 ? 'text-emerald-400 light:text-emerald-600 font-bold' : 'font-semibold'}>
                  {shipping === 0 ? 'GRATIS (Supera 35€)' : `${shipping.toFixed(2)} €`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-white light:text-slate-900 pt-2 border-t border-purple-500/20 light:border-slate-200">
                <span>Total Estimado:</span>
                <span className="text-base font-display gradient-text-price">{total.toFixed(2)} €</span>
              </div>
            </div>

            {/* Primary: Stripe Card & 1-Click Pay Checkout Button */}
            <button
              onClick={() => {
                onOpenStripeCheckout(discountAmount, shipping, total);
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#635bff] to-[#7a73ff] hover:opacity-95 text-white font-black text-xs shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <CreditCard className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Pagar con Tarjeta · {total.toFixed(2)} € (Stripe)</span>
            </button>

            {/* Accepted Payment Brands */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-purple-300/70 light:text-slate-500">
              <span className="font-bold">Aceptamos:</span>
              <span className="px-1.5 py-0.5 rounded bg-[#100824] light:bg-slate-200 text-blue-400 font-black text-[9px]">VISA</span>
              <span className="px-1.5 py-0.5 rounded bg-[#100824] light:bg-slate-200 text-amber-400 font-black text-[9px]">MC</span>
              <span className="px-1.5 py-0.5 rounded bg-[#100824] light:bg-slate-200 text-cyan-400 font-black text-[9px]">AMEX</span>
              <span className="px-1.5 py-0.5 rounded bg-[#100824] light:bg-slate-200 text-white light:text-slate-800 font-bold text-[9px]"> Pay</span>
              <span className="px-1.5 py-0.5 rounded bg-[#100824] light:bg-slate-200 text-emerald-400 font-bold text-[9px]">GPay</span>
            </div>

            {/* Secondary: WhatsApp Order */}
            <button
              onClick={handleCheckoutViaWhatsApp}
              className="w-full py-2.5 px-3 rounded-xl bg-[#120a2a] hover:bg-[#1c103e] light:bg-slate-100 light:hover:bg-slate-200 text-purple-200 light:text-slate-700 font-bold text-xs border border-purple-500/30 light:border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>O pedir por WhatsApp con atención humana</span>
            </button>

            <p className="text-[10px] text-slate-400 light:text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Pasarela cifrada 256-bit SSL · Garantía de satisfacción 30 días</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
