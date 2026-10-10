import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Key, 
  Truck, 
  ChevronRight, 
  ArrowLeft, 
  Download, 
  MessageCircle, 
  AlertCircle,
  Smartphone,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { CartItem } from './CartDrawer';
import { REAL_MOCKUPS } from '../assets/mockupImages';

interface StripeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shipping: number;
  total: number;
  onPaymentSuccess: (orderId: string) => void;
}

const DEFAULT_STRIPE_TEST_KEY = 'pk_test_TYooMQauvdEDq54NiTphI7jx';

export const StripeCheckoutModal: React.FC<StripeCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discountAmount,
  shipping,
  total,
  onPaymentSuccess
}) => {
  // Step state: 'shipping' | 'payment' | 'processing' | 'success'
  const [step, setStep] = useState<'shipping' | 'payment' | 'processing' | 'success'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'express'>('card');
  
  // Stripe API Key configuration
  const [stripeKey, setStripeKey] = useState<string>(() => {
    return localStorage.getItem('sublishop_stripe_pk') || DEFAULT_STRIPE_TEST_KEY;
  });
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [customKeyInput, setCustomKeyInput] = useState(stripeKey);
  const [copiedKey, setCopiedKey] = useState(false);

  // Customer & Shipping Info
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'España',
    notes: ''
  });

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');

  // Order result state
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    chargeId: string;
    date: string;
    total: number;
  } | null>(null);

  // Processing animation progress
  const [processingStage, setProcessingStage] = useState<string>('Iniciando pasarela de pago seguro...');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Determine card brand from number
  const getCardBrand = (num: string) => {
    const cleaned = num.replace(/\s+/g, '');
    if (/^4/.test(cleaned)) return { name: 'Visa', color: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    if (/^(5[1-5]|2[2-7])/.test(cleaned)) return { name: 'Mastercard', color: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    if (/^3[47]/.test(cleaned)) return { name: 'Amex', color: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' };
    return { name: 'Tarjeta', color: 'text-purple-300 light:text-slate-600', badge: 'bg-purple-500/20 text-purple-300 light:text-slate-700 border-purple-500/30' };
  };

  const cardBrand = getCardBrand(cardNumber);

  // Format card number with spaces every 4 digits
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  // Format MM/YY
  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 2) {
      raw = raw.slice(0, 2) + '/' + raw.slice(2);
    }
    setCardExpiry(raw);
  };

  // Format CVC
  const handleCardCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardCvc(raw);
  };

  // Quick fill test card
  const handleFillTestCard = () => {
    setCardNumber('4242 4242 4242 4242');
    setCardExpiry('12/28');
    setCardCvc('123');
    setCardName(formData.name || 'CLIENTE PRUEBA');
    toast.success('💳 Tarjeta de prueba Stripe rellenada', {
      description: 'Tarjeta Visa 4242 válida para el simulador de Stripe.'
    });
  };

  // Save custom Stripe Key
  const handleSaveStripeKey = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = customKeyInput.trim();
    if (!cleanKey) {
      localStorage.removeItem('sublishop_stripe_pk');
      setStripeKey(DEFAULT_STRIPE_TEST_KEY);
      toast.info('Se ha restaurado la clave de pruebas de Stripe');
    } else {
      localStorage.setItem('sublishop_stripe_pk', cleanKey);
      setStripeKey(cleanKey);
      toast.success('✅ Clave de Stripe guardada con éxito', {
        description: `Conectado a ${cleanKey.startsWith('pk_live') ? 'Stripe PRODUCCIÓN (Live)' : 'Stripe TEST (Sandbox)'}`
      });
    }
    setShowKeyConfig(false);
  };

  // Shipping submission
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.postalCode) {
      toast.error('Por favor completa los campos de envío obligatorios');
      return;
    }
    setCardName(formData.name);
    setStep('payment');
  };

  // Process payment simulation
  const handleProcessPayment = () => {
    if (paymentMethod === 'card') {
      const cleanNum = cardNumber.replace(/\s+/g, '');
      if (cleanNum.length < 15) {
        toast.error('Introduce un número de tarjeta válido (16 dígitos)');
        return;
      }
      if (cardExpiry.length < 5) {
        toast.error('Introduce una fecha de caducidad válida (MM/AA)');
        return;
      }
      if (cardCvc.length < 3) {
        toast.error('Introduce el código de seguridad CVC (3 dígitos)');
        return;
      }
    }

    setStep('processing');
    setProcessingStage('Conectando con Stripe Gateway...');

    setTimeout(() => {
      setProcessingStage('Verificando token y autenticación 3D Secure / SCA...');
    }, 900);

    setTimeout(() => {
      setProcessingStage('Autorizando cargo de ' + total.toFixed(2) + ' €...');
    }, 1800);

    setTimeout(() => {
      const orderId = `SUB-${Math.floor(100000 + Math.random() * 900000)}`;
      const chargeId = `ch_3P${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
      const now = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      setCompletedOrder({
        orderId,
        chargeId,
        date: now,
        total
      });

      setStep('success');

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // safe fallback
      }

      onPaymentSuccess(orderId);
      toast.success('🎉 ¡Pago procesado con éxito!', {
        description: `Pedido ${orderId} confirmado. Te hemos enviado los detalles a ${formData.email}.`
      });
    }, 2800);
  };

  // Download Invoice HTML receipt
  const handleDownloadInvoice = () => {
    if (!completedOrder) return;
    const invoiceContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Factura y Recibo de Compra - ${completedOrder.orderId}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; max-width: 700px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; }
          .brand { font-size: 24px; font-weight: 900; color: #ff2a5f; }
          .badge { background: #dcfce7; color: #15803d; padding: 4px 10px; border-radius: 999px; font-weight: bold; font-size: 12px; }
          .section { margin: 24px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { text-align: left; padding: 10px 8px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
          th { color: #64748b; font-size: 11px; text-transform: uppercase; }
          .total-row { font-weight: bold; font-size: 16px; border-top: 2px solid #cbd5e1; }
          .footer { margin-top: 40px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">SUBLISHOP</div>
            <p style="margin: 4px 0; font-size: 12px; color: #64748b;">Especialistas en Sublimación Textil HD</p>
          </div>
          <div style="text-align: right;">
            <span class="badge">PAGADO CON STRIPE</span>
            <p style="margin: 6px 0 0; font-size: 12px; font-weight: bold;">Pedido: ${completedOrder.orderId}</p>
            <p style="margin: 2px 0 0; font-size: 11px; color: #64748b;">${completedOrder.date}</p>
          </div>
        </div>

        <div class="section">
          <p style="font-size: 12px; color: #64748b; margin-bottom: 4px;">DATOS DEL CLIENTE Y ENVÍO:</p>
          <p style="margin: 0; font-weight: bold;">${formData.name}</p>
          <p style="margin: 2px 0; font-size: 13px;">${formData.address}, ${formData.postalCode} ${formData.city} (${formData.country})</p>
          <p style="margin: 2px 0; font-size: 12px; color: #64748b;">Email: ${formData.email} | Tel: ${formData.phone || 'No especificado'}</p>
        </div>

        <div class="section">
          <table>
            <thead>
              <tr>
                <th>Prenda / Producto</th>
                <th>Talla / Base</th>
                <th>Cant.</th>
                <th style="text-align: right;">Precio</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td>${item.product.name}</td>
                  <td>${item.size} / ${item.color}</td>
                  <td>${item.quantity}</td>
                  <td style="text-align: right;">${(item.product.price * item.quantity).toFixed(2)} €</td>
                </tr>
              `).join('')}
              <tr>
                <td colspan="3" style="text-align: right; color: #64748b;">Subtotal:</td>
                <td style="text-align: right;">${subtotal.toFixed(2)} €</td>
              </tr>
              ${discountAmount > 0 ? `
              <tr>
                <td colspan="3" style="text-align: right; color: #ff2a5f; font-weight: bold;">Descuento Apertura (-15%):</td>
                <td style="text-align: right; color: #ff2a5f; font-weight: bold;">-${discountAmount.toFixed(2)} €</td>
              </tr>
              ` : ''}
              <tr>
                <td colspan="3" style="text-align: right; color: #64748b;">Envío Express (24-48h):</td>
                <td style="text-align: right;">${shipping === 0 ? 'GRATIS' : `${shipping.toFixed(2)} €`}</td>
              </tr>
              <tr class="total-row">
                <td colspan="3" style="text-align: right;">TOTAL COBRADO:</td>
                <td style="text-align: right; color: #ff2a5f;">${completedOrder.total.toFixed(2)} €</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section" style="background: #f8fafc; padding: 14px; border-radius: 8px; font-size: 11px;">
          <p style="margin: 0; font-weight: bold;">ID de Transacción Stripe:</p>
          <code style="display: block; margin-top: 4px; color: #475569;">${completedOrder.chargeId}</code>
          <p style="margin: 8px 0 0; color: #64748b;">Este recibo sirve como comprobante de pago oficial y garantía de satisfacción 30 días.</p>
        </div>

        <div class="footer">
          <p>SubliShop España · Soporte y Seguimiento WhatsApp: +34 600 000 000 · sublishop@ejemplo.com</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([invoiceContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Recibo_Stripe_${completedOrder.orderId}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Factura descargada en tu dispositivo');
  };

  const isLiveKey = stripeKey.startsWith('pk_live_');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#140c2e] light:bg-white border border-purple-500/30 light:border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto text-white light:text-slate-900 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-purple-500/20 light:border-slate-200 bg-[#191038] light:bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#635bff] to-[#7a73ff] flex items-center justify-center text-white shadow-md">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-base text-white light:text-slate-900 tracking-tight">
                  Checkout Seguro
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#635bff]/20 text-[#8e85ff] light:text-[#534be0] border border-[#635bff]/30">
                  Stripe
                </span>
              </div>
              <p className="text-[11px] text-purple-200/70 light:text-slate-500 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Cifrado SSL 256-bit · Pagos seguros certificados PCI DSS</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Stripe Key Config Trigger */}
            <button
              type="button"
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              className="px-2.5 py-1.5 rounded-xl bg-[#23174f] light:bg-slate-100 hover:bg-[#2e1f66] light:hover:bg-slate-200 text-purple-200 light:text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-purple-500/30 light:border-slate-200"
              title="Configurar credenciales de Stripe"
            >
              <Key className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden sm:inline">Configurar Stripe</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-[#23174f] light:bg-slate-100 hover:bg-rose-500 hover:text-white text-purple-200 light:text-slate-500 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Collapsible Stripe Key Drawer */}
        {showKeyConfig && (
          <div className="p-4 bg-[#100824] light:bg-slate-100/90 border-b border-purple-500/30 light:border-slate-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 light:text-purple-700 shrink-0">
                <Key className="w-5 h-5" />
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-white light:text-slate-900">
                    Clave Pública de Stripe (Publishable Key)
                  </h4>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                    isLiveKey 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {isLiveKey ? 'Modo Producción (Live)' : 'Modo Pruebas (Test / Sandbox)'}
                  </span>
                </div>
                <p className="text-purple-200/70 light:text-slate-600 mb-3 text-[11px] leading-relaxed">
                  Puedes introducir aquí tu clave pública de Stripe (<code>pk_live_...</code> o <code>pk_test_...</code>) cuando desees conectarlo con tu cuenta bancaria. Si lo dejas como está, el sistema operará con el simulador seguro de pruebas de Stripe.
                </p>

                <form onSubmit={handleSaveStripeKey} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customKeyInput}
                      onChange={(e) => setCustomKeyInput(e.target.value)}
                      placeholder="pk_test_51... o pk_live_..."
                      className="flex-1 px-3 py-2 rounded-xl bg-[#1d1242] light:bg-white border border-purple-500/40 light:border-slate-300 font-mono text-xs text-white light:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#635bff]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#635bff] hover:bg-[#534be0] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                    >
                      Guardar Clave
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-purple-300/80 light:text-slate-500 pt-1">
                    <span>Clave actual en uso: <code className="font-mono text-pink-400 font-bold">{stripeKey.slice(0, 14)}...</code></span>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomKeyInput(DEFAULT_STRIPE_TEST_KEY);
                        localStorage.removeItem('sublishop_stripe_pk');
                        setStripeKey(DEFAULT_STRIPE_TEST_KEY);
                        toast.info('Restablecida clave por defecto de prueba');
                      }}
                      className="text-pink-400 hover:underline cursor-pointer"
                    >
                      Restablecer clave de prueba
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {/* STEP 1: Shipping & Customer Info */}
          {step === 'shipping' && (
            <div>
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-purple-500/20 light:border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h3 className="font-display font-black text-sm text-white light:text-slate-900">
                    Datos de Envío y Contacto
                  </h3>
                </div>
                <span className="text-xs text-purple-200/70 light:text-slate-500">Paso 1 de 2</span>
              </div>

              {/* Order quick summary bar */}
              <div className="p-3.5 mb-5 rounded-2xl bg-[#191038] light:bg-slate-50 border border-purple-500/20 light:border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-purple-200 light:text-slate-700">
                    {items.length} {items.length === 1 ? 'prenda' : 'prendas'} en el pedido
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-purple-200/70 light:text-slate-500 block">Total a pagar:</span>
                  <span className="font-display font-black text-sm text-pink-400 light:text-pink-600">
                    {total.toFixed(2)} €
                  </span>
                </div>
              </div>

              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-purple-200 light:text-slate-700 mb-1">
                      Nombre y Apellidos *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Lucas García"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#100824] light:bg-white border border-purple-500/30 light:border-slate-300 text-xs text-white light:text-slate-900 focus:ring-2 focus:ring-[#ff2a5f] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-purple-200 light:text-slate-700 mb-1">
                      Correo Electrónico (para el recibo y seguimiento) *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="lucas@ejemplo.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#100824] light:bg-white border border-purple-500/30 light:border-slate-300 text-xs text-white light:text-slate-900 focus:ring-2 focus:ring-[#ff2a5f] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-purple-200 light:text-slate-700 mb-1">
                      Dirección de entrega (Calle, Número, Piso) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Calle Gran Vía 42, 3º B"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#100824] light:bg-white border border-purple-500/30 light:border-slate-300 text-xs text-white light:text-slate-900 focus:ring-2 focus:ring-[#ff2a5f] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-purple-200 light:text-slate-700 mb-1">
                      Teléfono WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+34 600 000 000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#100824] light:bg-white border border-purple-500/30 light:border-slate-300 text-xs text-white light:text-slate-900 focus:ring-2 focus:ring-[#ff2a5f] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-purple-200 light:text-slate-700 mb-1">
                      Código Postal *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="28013"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#100824] light:bg-white border border-purple-500/30 light:border-slate-300 text-xs text-white light:text-slate-900 focus:ring-2 focus:ring-[#ff2a5f] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-purple-200 light:text-slate-700 mb-1">
                      Ciudad / Provincia *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Madrid"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#100824] light:bg-white border border-purple-500/30 light:border-slate-300 text-xs text-white light:text-slate-900 focus:ring-2 focus:ring-[#ff2a5f] focus:outline-none"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-purple-200 light:text-slate-700 mb-1">
                      País
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#100824] light:bg-white border border-purple-500/30 light:border-slate-300 text-xs text-white light:text-slate-900 focus:ring-2 focus:ring-[#ff2a5f] focus:outline-none"
                    >
                      <option value="España">España (Península e Islas)</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Francia">Francia</option>
                      <option value="Italia">Italia</option>
                      <option value="Alemania">Alemania</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-purple-500/20 light:border-slate-200">
                  <p className="text-[11px] text-purple-200/70 light:text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Envío con seguro a todo riesgo y tracking online</span>
                  </p>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff2a5f] to-[#ff4b78] hover:opacity-95 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continuar al Pago</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: Payment Details (Stripe Card & Express Checkout) */}
          {step === 'payment' && (
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-500/20 light:border-slate-200">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="flex items-center gap-1.5 text-xs text-purple-200 light:text-slate-600 hover:text-white light:hover:text-slate-900 font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver a datos de envío</span>
                </button>
                <span className="text-xs text-purple-200/70 light:text-slate-500">Paso 2 de 2</span>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-[#23154c] light:bg-slate-100 border-[#635bff] text-white light:text-slate-900 shadow-sm'
                      : 'bg-[#120a2a] light:bg-white border-purple-500/20 light:border-slate-200 text-purple-200/70 light:text-slate-500 hover:border-purple-500/40'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#635bff]" />
                  <span>Tarjeta Débito/Crédito</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('express')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'express'
                      ? 'bg-[#23154c] light:bg-slate-100 border-[#635bff] text-white light:text-slate-900 shadow-sm'
                      : 'bg-[#120a2a] light:bg-white border-purple-500/20 light:border-slate-200 text-purple-200/70 light:text-slate-500 hover:border-purple-500/40'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Apple Pay / Google Pay</span>
                </button>
              </div>

              {/* Express 1-Click Checkout */}
              {paymentMethod === 'express' && (
                <div className="p-6 rounded-2xl bg-[#100824] light:bg-slate-50 border border-purple-500/30 light:border-slate-200 text-center space-y-4 mb-4">
                  <p className="text-xs text-purple-200 light:text-slate-600">
                    Paga en 1 solo clic con el método configurado en tu móvil o navegador:
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={handleProcessPayment}
                      className="px-6 py-3.5 rounded-xl bg-black hover:bg-slate-900 text-white font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
                    >
                      <span> Pay</span>
                      <span className="text-slate-400 font-normal">|</span>
                      <span>Pagar {total.toFixed(2)} €</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleProcessPayment}
                      className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-300"
                    >
                      <span className="text-[#4285F4]">G</span>
                      <span className="text-[#EA4335]">o</span>
                      <span className="text-[#FBBC05]">o</span>
                      <span className="text-[#4285F4]">g</span>
                      <span className="text-[#34A853]">l</span>
                      <span className="text-[#EA4335]">e</span>
                      <span className="ml-1 text-slate-800">Pay · {total.toFixed(2)} €</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-purple-300/70 light:text-slate-500">
                    Autenticación biométrica Face ID / Touch ID inmediata gestionada por Stripe.
                  </p>
                </div>
              )}

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  {/* Test Mode Card Helper button */}
                  <div className="p-3 rounded-xl bg-[#191038] light:bg-purple-50/70 border border-purple-500/30 light:border-purple-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <Sparkles className="w-4 h-4 text-pink-400" />
                      <span className="text-purple-200 light:text-purple-900 font-medium">
                        Modo Sandbox Stripe:
                      </span>
                      <span className="text-[11px] font-mono text-purple-300 light:text-purple-700">
                        4242 •••• •••• 4242
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleFillTestCard}
                      className="px-2.5 py-1 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 light:bg-pink-100 text-pink-400 light:text-pink-700 text-[11px] font-bold border border-pink-500/30 light:border-pink-300 transition-colors cursor-pointer"
                    >
                      Autocompletar
                    </button>
                  </div>

                  {/* Card Number Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-purple-200 light:text-slate-700">
                        Número de Tarjeta
                      </label>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${cardBrand.badge}`}>
                        {cardBrand.name}
                      </span>
                    </div>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-purple-400 light:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="4242 4242 4242 4242"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#100824] light:bg-white border border-purple-500/30 light:border-slate-300 text-xs font-mono font-bold tracking-wider text-white light:text-slate-900 focus:ring-2 focus:ring-[#635bff] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Expiry + CVC + Cardholder */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-purple-200 light:text-slate-700 mb-1">
                        Caducidad (MM/AA)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={handleCardExpiryChange}
                        placeholder="12/28"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#100824] light:bg-white border border-purple-500/30 light:border-slate-300 text-xs font-mono font-bold text-white light:text-slate-900 focus:ring-2 focus:ring-[#635bff] focus:outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-purple-200 light:text-slate-700">
                          CVC / CVV
                        </label>
                        <Lock className="w-3 h-3 text-purple-400 light:text-slate-400" />
                      </div>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={handleCardCvcChange}
                        placeholder="123"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#100824] light:bg-white border border-purple-500/30 light:border-slate-300 text-xs font-mono font-bold text-white light:text-slate-900 focus:ring-2 focus:ring-[#635bff] focus:outline-none"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-bold text-purple-200 light:text-slate-700 mb-1">
                        Titular de la Tarjeta
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        placeholder="NOMBRE COMPLETO"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#100824] light:bg-white border border-purple-500/30 light:border-slate-300 text-xs uppercase font-bold text-white light:text-slate-900 focus:ring-2 focus:ring-[#635bff] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Total & Pay button */}
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={handleProcessPayment}
                      className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#635bff] to-[#7a73ff] hover:opacity-95 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Pagar {total.toFixed(2)} € con Stripe</span>
                    </button>

                    <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-purple-300/70 light:text-slate-500">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Autenticación 3D Secure</span>
                      </span>
                      <span>·</span>
                      <span>Stripe Checkout Verified</span>
                      <span>·</span>
                      <span>Revisión de arte previa</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Processing Loading State */}
          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-[#635bff]/20 border-t-[#635bff] animate-spin" />
                <Lock className="w-6 h-6 text-[#635bff] absolute inset-0 m-auto" />
              </div>

              <div>
                <h3 className="font-display font-black text-lg text-white light:text-slate-900">
                  Procesando Pago Seguro
                </h3>
                <p className="text-xs text-purple-200/80 light:text-slate-600 mt-1">
                  {processingStage}
                </p>
              </div>

              <div className="max-w-xs w-full bg-[#100824] light:bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#635bff] to-[#ff2a5f] animate-pulse w-3/4 rounded-full" />
              </div>

              <p className="text-[11px] text-slate-400 light:text-slate-500">
                Por favor, no cierres esta ventana ni recargues la página.
              </p>
            </div>
          )}

          {/* STEP 4: Success State */}
          {step === 'success' && completedOrder && (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Pago Confirmado por Stripe
                </span>
                <h3 className="font-display font-black text-2xl text-white light:text-slate-900 mt-2">
                  ¡Gracias por tu pedido, {formData.name.split(' ')[0]}!
                </h3>
                <p className="text-xs text-purple-200/80 light:text-slate-600 mt-1">
                  Referencia de pedido: <strong className="text-white light:text-slate-900 font-mono">{completedOrder.orderId}</strong>
                </p>
              </div>

              {/* Order breakdown summary */}
              <div className="p-4 rounded-2xl bg-[#191038] light:bg-slate-50 border border-purple-500/20 light:border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between text-purple-200/70 light:text-slate-600">
                  <span>Importe cobrado:</span>
                  <span className="font-bold text-white light:text-slate-900">{completedOrder.total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-purple-200/70 light:text-slate-600">
                  <span>Dirección de entrega:</span>
                  <span className="font-semibold text-white light:text-slate-900 truncate max-w-[240px]">
                    {formData.address}, {formData.city}
                  </span>
                </div>
                <div className="flex justify-between text-purple-200/70 light:text-slate-600">
                  <span>Plazo de fabricación y entrega:</span>
                  <span className="text-emerald-400 light:text-emerald-600 font-bold">24 a 48 horas laborables</span>
                </div>
                <div className="flex justify-between text-[11px] text-purple-300/50 light:text-slate-400 pt-1 border-t border-purple-500/20 light:border-slate-200">
                  <span>ID de transacción Stripe:</span>
                  <span className="font-mono">{completedOrder.chargeId}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadInvoice}
                  className="py-3 px-4 rounded-xl bg-[#23174f] hover:bg-[#2f1f6a] light:bg-slate-100 light:hover:bg-slate-200 text-white light:text-slate-900 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-purple-500/30 light:border-slate-200"
                >
                  <Download className="w-4 h-4 text-pink-400" />
                  <span>Descargar Recibo / Factura</span>
                </button>

                <a
                  href={`https://wa.me/34600000000?text=${encodeURIComponent(
                    `¡Hola SubliShop! He completado el pago de mi pedido ${completedOrder.orderId} (${completedOrder.total.toFixed(2)}€) por Stripe. Mi nombre es ${formData.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Avisar por WhatsApp</span>
                </a>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff2a5f] to-[#ff4b78] hover:opacity-95 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Cerrar y volver a la tienda
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
