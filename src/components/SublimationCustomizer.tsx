import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Layers, 
  MessageCircle, 
  RotateCcw,
  Zap,
  Check,
  CreditCard,
  ShoppingBag,
  Lock
} from 'lucide-react';
import { ApparelMockup, PRESET_ARTS } from './ApparelMockup';
import { REAL_MOCKUPS } from '../assets/mockupImages';
import { PRODUCTS, Product } from '../data/products';
import { toast } from 'sonner';

type GarmentType = 'tshirt-oversize' | 'tshirt-classic' | 'hoodie-hd' | 'tote-bag' | 'gymsack';

const BASE_COLORS = [
  { name: 'Blanco Óptico', hex: '#FFFFFF' },
  { name: 'Gris Jaspeado', hex: '#E2E8F0' },
  { name: 'Off-White Arena', hex: '#F5F5F0' },
  { name: 'Streetwear Dark', hex: '#1E293B' },
];

interface SublimationCustomizerProps {
  onAddToCart?: (product: Product, size: string, color: string) => void;
  onQuickCheckout?: (product: Product, size: string, color: string) => void;
}

interface GarmentConfig {
  id: GarmentType;
  name: string;
  shortName: string;
  weight: string;
  price: number;
  discounted: string;
  defaultPreset: 'cyberpunk' | 'anime' | 'streetwear' | 'minimal';
  badge?: string;
  printZone: string;
}

const GARMENTS: Record<GarmentType, GarmentConfig> = {
  'tshirt-oversize': {
    id: 'tshirt-oversize',
    name: 'Camiseta Oversize Streetwear',
    shortName: 'Oversize Boxy',
    weight: '220 g/m² Heavy Weight',
    price: 21.99,
    discounted: (21.99 * 0.85).toFixed(2),
    defaultPreset: 'cyberpunk',
    badge: 'Top Ventas',
    printZone: 'Pecho / Full Print Espalda'
  },
  'tshirt-classic': {
    id: 'tshirt-classic',
    name: 'Camiseta Clásica Spun Soft',
    shortName: 'Clásica Spun',
    weight: '160 g/m² Algodón Tech',
    price: 16.99,
    discounted: (16.99 * 0.85).toFixed(2),
    defaultPreset: 'streetwear',
    badge: 'Más Popular',
    printZone: 'Pecho Central A3+'
  },
  'hoodie-hd': {
    id: 'hoodie-hd',
    name: 'Sudadera Hoodie Canguro HD',
    shortName: 'Sudadera Hoodie',
    weight: '280 g/m² Felpa Interior',
    price: 34.99,
    discounted: (34.99 * 0.85).toFixed(2),
    defaultPreset: 'anime',
    badge: 'Invierno HD',
    printZone: 'Frontal Torso + Capucha'
  },
  'tote-bag': {
    id: 'tote-bag',
    name: 'Tote Bag Lona Pesada',
    shortName: 'Tote Bag Lona',
    weight: '240 g/m² Lona Tenaz',
    price: 12.99,
    discounted: (12.99 * 0.85).toFixed(2),
    defaultPreset: 'minimal',
    badge: 'Ecológico',
    printZone: 'Doble Cara 35x38 cm'
  },
  'gymsack': {
    id: 'gymsack',
    name: 'Mochila Gymsack Full-Print',
    shortName: 'Mochila Gymsack',
    weight: '190 g/m² Ripstop',
    price: 17.99,
    discounted: (17.99 * 0.85).toFixed(2),
    defaultPreset: 'cyberpunk',
    badge: 'Street Merch',
    printZone: 'Cara Completa 360°'
  }
};

export const SublimationCustomizer: React.FC<SublimationCustomizerProps> = ({
  onAddToCart,
  onQuickCheckout
}) => {
  const [selectedGarment, setSelectedGarment] = useState<GarmentType>('tshirt-oversize');
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [artPreset, setArtPreset] = useState<'cyberpunk' | 'anime' | 'streetwear' | 'minimal'>('cyberpunk');
  const [uploadedArt, setUploadedArt] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'custom' | 'lookbook'>('custom');
  const [selectedSize, setSelectedSize] = useState('L');

  const currentGarment = GARMENTS[selectedGarment];

  const getProductForGarment = (): Product => {
    const map: Record<GarmentType, string> = {
      'tshirt-oversize': 'camiseta-oversize-box',
      'tshirt-classic': 'camiseta-clasica',
      'hoodie-hd': 'sudadera-hoodie-heavy',
      'tote-bag': 'tote-bag-canvas',
      'gymsack': 'mochila-sublimada'
    };
    const prodId = map[selectedGarment];
    return PRODUCTS.find(p => p.id === prodId) || PRODUCTS[0];
  };

  const getColorName = (hex: string) => {
    const match = BASE_COLORS.find(c => c.hex.toLowerCase() === hex.toLowerCase());
    return match ? match.name : 'Personalizado';
  };

  const handleAddToCart = () => {
    const product = getProductForGarment();
    if (onAddToCart) {
      onAddToCart(product, selectedSize, getColorName(selectedColor));
    } else {
      toast.success(`Añadido ${product.name} al carrito`);
    }
  };

  const handleStripePay = () => {
    const product = getProductForGarment();
    if (onQuickCheckout) {
      onQuickCheckout(product, selectedSize, getColorName(selectedColor));
    } else if (onAddToCart) {
      onAddToCart(product, selectedSize, getColorName(selectedColor));
    }
  };

  const handleSelectGarment = (garmentId: GarmentType) => {
    setSelectedGarment(garmentId);
    if (!uploadedArt) {
      setArtPreset(GARMENTS[garmentId].defaultPreset);
    }
    toast.success(`Prenda seleccionada: ${GARMENTS[garmentId].name}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen es demasiado grande (máx 5MB).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedArt(event.target?.result as string);
        setViewMode('custom');
        toast.success('¡Diseño cargado con éxito! Así lucirá tu sublimación textil.');
      };
      reader.readAsDataURL(file);
    }
  };

  const clearUpload = () => {
    setUploadedArt(null);
    setArtPreset(currentGarment.defaultPreset);
    toast.info('Volviendo a los diseños de muestra.');
  };

  const handleWhatsAppQuote = () => {
    const artText = uploadedArt ? 'con mi propio diseño subido' : `con el estilo ${artPreset}`;
    const message = `Hola SubliShop! He probado el probador en vivo y quiero pedir la ${currentGarment.name} (${selectedColor === '#FFFFFF' ? 'Blanco' : 'Color base'}) ${artText}. ¿Cómo aplico el 15% de descuento de apertura (SUBLI15)?`;
    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="personalizador" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-[#4f46e5] text-xs font-black uppercase tracking-wider mb-3 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Probador Textil en Tiempo Real</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white light:text-slate-900 tracking-tight">
            Diseña tu prenda y comprueba el <span className="gradient-text-warm">acabado real</span>
          </h2>
          <p className="mt-3 text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Sube tu propia imagen o logotipo, o prueba nuestros estilos streetwear. La sublimación penetra en el tejido para una prenda transpirable, suave e indestructible.
          </p>
        </div>

        {/* Customizer Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Choose Garment */}
            <div className="glass-surface p-5 sm:p-6 rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-pink-400 light:text-pink-600 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-pink-500/20 text-[#ff2a5f] flex items-center justify-center text-[11px] font-bold">1</span>
                  Elige la prenda
                </span>
                <span className="text-xs font-bold text-slate-400 light:text-slate-500">{currentGarment.weight}</span>
              </div>

              {/* Garment Selector with Visual Product Thumbnails */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {(Object.keys(GARMENTS) as GarmentType[]).map((garmentKey) => {
                  const g = GARMENTS[garmentKey];
                  const isSelected = selectedGarment === garmentKey;
                  const thumbSrc = REAL_MOCKUPS[garmentKey];

                  return (
                    <button
                      key={garmentKey}
                      type="button"
                      onClick={() => handleSelectGarment(garmentKey)}
                      className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 relative group ${
                        isSelected
                          ? 'border-[#ff2a5f] bg-pink-950/40 light:bg-pink-50/80 text-white light:text-slate-900 shadow-md ring-1 ring-[#ff2a5f]/40'
                          : 'border-slate-800/80 light:border-slate-200 bg-slate-900/60 light:bg-white hover:bg-slate-800 light:hover:bg-slate-50 text-slate-300 light:text-slate-700'
                      }`}
                    >
                      {/* Crisp Garment Thumbnail Photo */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-950/40 border border-white/10 relative">
                        <img
                          src={thumbSrc}
                          alt={g.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#ff2a5f]/20 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white drop-shadow-md stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="font-black text-xs text-white light:text-slate-900 truncate">
                            {g.name}
                          </p>
                          {g.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 light:text-purple-700 font-bold shrink-0">
                              {g.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-[11px] mt-0.5">
                          <span className="text-slate-400 light:text-slate-500 font-normal truncate">
                            {g.weight}
                          </span>
                          <div className="flex items-baseline gap-1 shrink-0">
                            <span className="text-pink-400 light:text-pink-600 font-black">
                              {g.discounted} €
                            </span>
                            <span className="text-[10px] text-slate-400 line-through">
                              {g.price.toFixed(2)} €
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Color selector */}
              <div className="pt-3 border-t border-slate-800 light:border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 light:text-slate-600">Color base textil:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedColor('#FFFFFF')}
                    className={`w-7 h-7 rounded-full border-2 bg-white transition-all cursor-pointer ${
                      selectedColor === '#FFFFFF' ? 'border-[#ff2a5f] scale-110 shadow-xs' : 'border-slate-600 light:border-slate-300'
                    }`}
                    title="Blanco Óptico"
                    aria-label="Color blanco"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedColor('#E2E8F0')}
                    className={`w-7 h-7 rounded-full border-2 bg-slate-200 transition-all cursor-pointer ${
                      selectedColor === '#E2E8F0' ? 'border-[#ff2a5f] scale-110 shadow-xs' : 'border-slate-600 light:border-slate-300'
                    }`}
                    title="Gris Jaspeado"
                    aria-label="Color gris"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedColor('#F5F5F0')}
                    className={`w-7 h-7 rounded-full border-2 bg-stone-100 transition-all cursor-pointer ${
                      selectedColor === '#F5F5F0' ? 'border-[#ff2a5f] scale-110 shadow-xs' : 'border-slate-600 light:border-slate-300'
                    }`}
                    title="Off-White Arena"
                    aria-label="Color arena"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedColor('#1E293B')}
                    className={`w-7 h-7 rounded-full border-2 bg-slate-800 transition-all cursor-pointer ${
                      selectedColor === '#1E293B' ? 'border-[#ff2a5f] scale-110 shadow-xs' : 'border-slate-600 light:border-slate-300'
                    }`}
                    title="Streetwear Dark"
                    aria-label="Color negro"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Upload or Choose Art */}
            <div className="glass-surface p-5 sm:p-6 rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-400 light:text-indigo-600 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-[#4f46e5] flex items-center justify-center text-[11px] font-bold">2</span>
                  Sube tu arte o elige preset
                </span>
                {uploadedArt && (
                  <button
                    onClick={clearUpload}
                    className="text-[11px] text-pink-400 light:text-pink-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Resetear
                  </button>
                )}
              </div>

              {/* Upload Dropzone */}
              <div>
                <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-700 light:border-slate-300 hover:border-pink-500 rounded-2xl p-4 cursor-pointer bg-slate-900/60 light:bg-white/70 hover:bg-slate-800/60 light:hover:bg-pink-50/30 transition-all text-center">
                  <Upload className="w-6 h-6 text-pink-400 mb-1.5" />
                  <span className="text-xs font-bold text-white light:text-slate-800">
                    {uploadedArt ? 'Cambiar archivo subido' : 'Subir imagen o logotipo'}
                  </span>
                  <span className="text-[11px] text-slate-400 light:text-slate-500 mt-0.5">
                    PNG transparente, JPG o SVG (máx. 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Presets buttons */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 light:text-slate-500 block mb-2">
                  O prueba estilos prediseñados:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  {(Object.keys(PRESET_ARTS) as (keyof typeof PRESET_ARTS)[]).map((key) => {
                    const p = PRESET_ARTS[key];
                    const isActive = !uploadedArt && artPreset === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setUploadedArt(null);
                          setArtPreset(key);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                          isActive
                            ? 'border-indigo-500 bg-indigo-950/60 light:bg-indigo-50/70 text-indigo-300 light:text-indigo-900 shadow-xs'
                            : 'border-slate-800 light:border-slate-200 bg-slate-900/60 light:bg-white hover:bg-slate-800 light:hover:bg-slate-50 text-slate-300 light:text-slate-700'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-tr ${p.gradient}`} />
                        <div>
                          <p className="font-extrabold text-[11px] leading-tight">{p.title}</p>
                          <span className="text-[10px] text-slate-400 light:text-slate-500 font-normal">{p.tag}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="glass-surface p-4 rounded-2xl shadow-sm border border-slate-800/80 light:border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white light:text-slate-800">
                  Talla de la prenda:
                </span>
                <span className="text-[11px] text-pink-400 font-semibold">
                  {selectedGarment === 'tote-bag' || selectedGarment === 'gymsack' ? 'Medida estándar' : `Talla seleccionada: ${selectedSize}`}
                </span>
              </div>

              {selectedGarment === 'tote-bag' || selectedGarment === 'gymsack' ? (
                <div className="p-2 rounded-xl bg-purple-500/10 light:bg-purple-50 border border-purple-500/20 text-xs font-semibold text-purple-200 light:text-purple-800 text-center">
                  Talla Única Standard ({selectedGarment === 'tote-bag' ? '38 x 42 cm' : '35 x 44 cm'})
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-1.5">
                  {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                        selectedSize === size
                          ? 'bg-pink-600 text-white border-pink-500 shadow-sm'
                          : 'bg-[#100824] light:bg-white border-purple-500/20 light:border-slate-200 text-purple-200 light:text-slate-700 hover:border-pink-500/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price breakdown & Checkout CTAs */}
            <div className="glass-surface p-5 sm:p-6 rounded-3xl shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 light:text-slate-500 font-medium">Precio estimado por prenda:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-black text-2xl text-white light:text-slate-900">
                      {currentGarment.discounted} €
                    </span>
                    <span className="text-xs text-slate-400 light:text-slate-600 line-through">
                      {currentGarment.price.toFixed(2)} €
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase border border-emerald-500/30">
                      -15% DTO
                    </span>
                  </div>
                </div>
                <span className="text-right text-[11px] text-slate-400 light:text-slate-500">
                  IVA incluido<br />Envío gratis &gt;35€
                </span>
              </div>

              {/* 1. Stripe Checkout Direct Button */}
              <button
                type="button"
                onClick={handleStripePay}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#635bff] to-[#7a73ff] hover:opacity-95 text-white font-black text-xs shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <CreditCard className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Pagar esta prenda con Tarjeta · {currentGarment.discounted} € (Stripe)</span>
              </button>

              {/* 2. Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff2a5f] to-[#ff4b78] hover:opacity-95 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Añadir a la Cesta de Compra</span>
              </button>

              {/* 3. WhatsApp Quote */}
              <button
                type="button"
                onClick={handleWhatsAppQuote}
                className="w-full py-2.5 px-3 rounded-xl bg-[#120a2a] hover:bg-[#1c103e] light:bg-slate-100 light:hover:bg-slate-200 text-purple-200 light:text-slate-700 font-bold text-xs border border-purple-500/30 light:border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>O consultar diseño por WhatsApp (-15% DTO)</span>
              </button>

              <p className="text-[10px] text-slate-400 light:text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Pago seguro cifrado 256-bit SSL con Stripe · Entrega en 24-48h</span>
              </p>
            </div>

          </div>

          {/* Right: Visual Display & Science Comparison (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visual Preview Box */}
            <div className="glass-surface p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col items-center">
              
              {/* Header inside display with View Mode Selector */}
              <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 light:border-slate-200 mb-3 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-white light:text-slate-700">
                    {currentGarment.name} · <span className="text-pink-400 font-semibold">{currentGarment.printZone}</span>
                  </span>
                </div>

                {/* Switcher: Custom Simulation vs Studio Lookbook */}
                <div className="flex items-center gap-1 bg-slate-900/80 light:bg-slate-100 p-1 rounded-xl border border-slate-800 light:border-slate-200">
                  <button
                    type="button"
                    onClick={() => setViewMode('custom')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      viewMode === 'custom'
                        ? 'bg-pink-600 text-white shadow-xs'
                        : 'text-slate-400 light:text-slate-600 hover:text-white'
                    }`}
                  >
                    Simulador Interactivo
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('lookbook')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      viewMode === 'lookbook'
                        ? 'bg-pink-600 text-white shadow-xs'
                        : 'text-slate-400 light:text-slate-600 hover:text-white'
                    }`}
                  >
                    📸 Foto Estudio HD
                  </button>
                </div>
              </div>

              {/* Main Apparel Render */}
              <div className="relative w-full max-w-[440px] h-[410px] flex items-center justify-center py-4 rounded-2xl bg-gradient-to-b from-slate-950/60 to-slate-900/60 light:from-slate-100/50 light:to-slate-200/50 border border-slate-800/80 light:border-slate-200/60">
                <ApparelMockup
                  type={selectedGarment}
                  colorHex={viewMode === 'lookbook' ? '#FFFFFF' : selectedColor}
                  artUrl={viewMode === 'lookbook' ? undefined : (uploadedArt || undefined)}
                  artPreset={artPreset}
                  forceRealisticPhoto={viewMode === 'lookbook'}
                  className="w-full h-full max-h-[390px]"
                />
              </div>

              {/* Position and Details Indicator */}
              <div className="w-full pt-4 border-t border-slate-800 light:border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-pink-400" />
                  <span className="text-slate-400 light:text-slate-600 font-medium">Técnica:</span>
                  <strong className="text-white light:text-slate-900">Sublimación Térmica 200°C</strong>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400 light:text-slate-500">
                  <span>Tacto en tejido:</span>
                  <strong className="text-emerald-400 font-bold">0% residuo plástico</strong>
                </div>
              </div>
            </div>

            {/* Scientific Sublimation vs Vinyl Comparison */}
            <div className="p-6 rounded-3xl bg-slate-900/90 light:bg-slate-900 text-white shadow-xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 left-0 right-0 h-1 bar-flow" />

              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-yellow-400" />
                <h3 className="font-display font-black text-sm uppercase tracking-wider text-pink-400">
                  ¿Por qué la sublimación SubliShop es superior?
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-3">
                {/* Traditional Vinyl */}
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
                  <div className="flex items-center justify-between text-rose-400 font-bold">
                    <span>❌ Vinilo / Transfer Común</span>
                    <span className="text-[10px] uppercase">Anticuado</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Es una película plástica pegada sobre la tela. Con el calor del verano hace sudar, y tras 3 o 4 lavadoras se cuartea y se desprende.
                  </p>
                </div>

                {/* SubliShop Sublimation */}
                <div className="p-3.5 rounded-2xl bg-indigo-950/80 border border-indigo-700/80 space-y-1.5">
                  <div className="flex items-center justify-between text-teal-400 font-bold">
                    <span>✅ Sublimación SubliShop</span>
                    <span className="text-[10px] uppercase font-black">Nuestra técnica</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    La tinta se gasifica a 200°C y penetra directamente en el interior del polímero. <strong>Forma parte del hilo</strong>: transpirable, elástica e inmortal al lavado.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
