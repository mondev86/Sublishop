import React, { useState } from 'react';
import { Heart, Sparkles, Plus, Eye, Check, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { ApparelMockup } from './ApparelMockup';
import { REAL_MOCKUPS } from '../assets/mockupImages';
import { toast } from 'sonner';

interface ProductsGridProps {
  onSelectProduct?: (product: Product, size: string, color: string) => void;
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'camisetas' | 'sudaderas' | 'accesorios'>('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'camiseta-clasica': 'M',
    'camiseta-oversize': 'L',
    'hoodie-sublimada': 'L',
    'tote-bag-sublimada': 'Única (38 x 42 cm)',
    'mochila-sublimada': 'Única (35 x 45 cm)'
  });
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    'camiseta-clasica': '#FFFFFF',
    'camiseta-oversize': '#FFFFFF',
    'hoodie-sublimada': '#FFFFFF',
    'tote-bag-sublimada': '#FFFFFF',
    'mochila-sublimada': '#FFFFFF'
  });
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const toggleFavorite = (productId: string, productName: string) => {
    const nextState = !favorites[productId];
    setFavorites(prev => ({ ...prev, [productId]: nextState }));
    if (nextState) {
      toast.success(`❤️ Añadido a tus prendas favoritas: ${productName}`);
    } else {
      toast.info(`Quitado de favoritos: ${productName}`);
    }
  };

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleColorChange = (productId: string, hex: string) => {
    setSelectedColors(prev => ({ ...prev, [productId]: hex }));
  };

  const handleAddOrCustomize = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    const color = selectedColors[product.id] || product.colors[0].hex;
    if (onSelectProduct) {
      onSelectProduct(product, size, color);
    } else {
      setActiveModalProduct(product);
    }
  };

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <section id="productos" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-[#ff2a5f] text-xs font-black uppercase tracking-wider mb-3">
            <span>👕 Colección Textil 2026</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white light:text-slate-900 tracking-tight">
            Ropa Personalizada con <span className="gradient-text-warm">Sublimación Total</span>
          </h2>
          <p className="mt-3 text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Tejidos técnicos de tacto suave algodón y cortes modernos streetwear. 
            Elige tu prenda base, personalízala con tu diseño o logotipo y disfruta del 15% de descuento de apertura.
          </p>

          {/* Category Filter Pills (Functional Buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-[#1a133b]/80 light:bg-white/90 hover:bg-[#251b54] light:hover:bg-slate-100 text-purple-200/90 light:text-slate-700 border border-purple-500/30 light:border-slate-200'
              }`}
            >
              Todas las prendas ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('camisetas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'camisetas'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-[#1a133b]/80 light:bg-white/90 hover:bg-[#251b54] light:hover:bg-slate-100 text-purple-200/90 light:text-slate-700 border border-purple-500/30 light:border-slate-200'
              }`}
            >
              Camisetas & Oversize
            </button>
            <button
              onClick={() => setSelectedCategory('sudaderas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'sudaderas'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-[#1a133b]/80 light:bg-white/90 hover:bg-[#251b54] light:hover:bg-slate-100 text-purple-200/90 light:text-slate-700 border border-purple-500/30 light:border-slate-200'
              }`}
            >
              Sudaderas & Hoodies
            </button>
            <button
              onClick={() => setSelectedCategory('accesorios')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'accesorios'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-[#1a133b]/80 light:bg-white/90 hover:bg-[#251b54] light:hover:bg-slate-100 text-purple-200/90 light:text-slate-700 border border-purple-500/30 light:border-slate-200'
              }`}
            >
              Bolsos & Mochilas
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const currentSize = selectedSizes[product.id] || product.sizes[0];
            const currentColor = selectedColors[product.id] || product.colors[0].hex;
            const isFav = !!favorites[product.id];

            return (
              <div
                key={product.id}
                className="glass-surface rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
              >
                {/* Visual Apparel Card Header & Mockup */}
                <div className="relative bg-gradient-to-b from-[#181136]/60 to-[#120b29]/80 light:from-slate-100/60 light:to-slate-200/40 p-6 flex items-center justify-center min-h-[300px] overflow-hidden border-b border-purple-500/20 light:border-slate-100">
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-xs bg-[#0e0922]/90 light:bg-slate-900 text-white border border-purple-500/30 light:border-transparent">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id, product.name)}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#1a133b]/80 light:bg-white/90 hover:bg-[#261c56] light:hover:bg-white text-purple-200 light:text-slate-600 hover:text-[#ff2a5f] flex items-center justify-center shadow-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 border border-purple-500/30 light:border-transparent"
                    aria-label={isFav ? `Quitar ${product.name} de favoritos` : `Añadir ${product.name} a favoritos`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform ${
                        isFav ? 'fill-[#ff2a5f] text-[#ff2a5f] scale-110' : ''
                      }`}
                    />
                  </button>

                  {/* Apparel Rendering */}
                  <div className="w-full h-[260px] flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
                    <ApparelMockup
                      type={product.image}
                      colorHex={currentColor}
                      artPreset={
                        product.category === 'sudaderas'
                          ? 'anime'
                          : product.id === 'camiseta-oversize'
                          ? 'cyberpunk'
                          : product.id === 'tote-bag-sublimada'
                          ? 'minimal'
                          : 'streetwear'
                      }
                      className="w-full h-full max-w-[260px]"
                    />
                  </div>

                  {/* Quick View trigger */}
                  <button
                    onClick={() => setActiveModalProduct(product)}
                    className="absolute bottom-3 right-4 px-3 py-1.5 rounded-lg bg-slate-900/80 light:bg-white/90 hover:bg-slate-800 light:hover:bg-white text-slate-200 light:text-slate-800 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all opacity-90 group-hover:opacity-100 cursor-pointer border border-slate-700 light:border-transparent"
                    aria-label={`Ver detalles técnicos de ${product.name}`}
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400 light:text-slate-600" />
                    <span>Detalles</span>
                  </button>
                </div>

                {/* Card Content & Options */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Title & Price */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-pink-400 light:text-slate-500">
                          {product.category === 'camisetas' ? 'Streetwear Apparel' : product.category === 'sudaderas' ? 'Outerwear' : 'Bolsos & Merch'}
                        </span>
                        <h3 className="font-display font-bold text-lg text-white light:text-slate-900 group-hover:text-pink-400 light:group-hover:text-pink-600 transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="font-display font-black text-xl gradient-text-price">
                          {product.price.toFixed(2)} €
                        </span>
                        {product.originalPrice && (
                          <span className="block text-xs text-slate-400 light:text-slate-500 line-through">
                            {product.originalPrice.toFixed(2)} €
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 light:text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Color palette selector */}
                    <div className="mt-4 pt-3 border-t border-slate-800 light:border-slate-100">
                      <div className="flex items-center justify-between mb-1.5 text-[11px]">
                        <span className="text-slate-400 light:text-slate-500 font-semibold">Color base textil:</span>
                        <span className="text-white light:text-slate-800 font-bold">
                          {product.colors.find(c => c.hex === currentColor)?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {product.colors.map(color => (
                          <button
                            key={color.hex}
                            onClick={() => handleColorChange(product.id, color.hex)}
                            className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                              currentColor === color.hex
                                ? 'border-[#ff2a5f] scale-110 shadow-xs'
                                : 'border-slate-600 light:border-slate-300 hover:scale-105'
                            } ${color.class}`}
                            title={color.name}
                            aria-label={`Seleccionar color ${color.name} para ${product.name}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Size selector buttons */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1.5 text-[11px]">
                        <span className="text-slate-400 light:text-slate-500 font-semibold">Talla:</span>
                        <span className="text-[#ff2a5f] font-bold">{currentSize}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {product.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => handleSizeChange(product.id, size)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                              currentSize === size
                                ? 'bg-pink-600 text-white shadow-xs'
                                : 'bg-slate-800 light:bg-slate-100 hover:bg-slate-700 light:hover:bg-slate-200 text-slate-300 light:text-slate-700'
                            }`}
                            aria-label={`Talla ${size}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleAddOrCustomize(product)}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff2a5f] to-[#ff4b78] hover:opacity-95 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      aria-label={`Personalizar y añadir ${product.name}`}
                    >
                      <Plus className="w-4 h-4 text-pink-200" />
                      <span>+ Personalizar / Añadir</span>
                    </button>
                    
                    <p className="text-[10px] text-slate-400 light:text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>15% DTO de bienvenida aplicable en el carrito</span>
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Quick Details Modal */}
      {activeModalProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-slate-900 light:bg-white text-white light:text-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-800 light:border-slate-100 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 light:bg-slate-100 hover:bg-slate-700 light:hover:bg-slate-200 text-slate-300 light:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            {/* Product Real Image Preview in Modal */}
            <div className="w-full h-48 sm:h-56 mb-4 rounded-2xl overflow-hidden bg-slate-950/60 light:bg-slate-100 flex items-center justify-center border border-purple-500/20 light:border-slate-200">
              <img
                src={REAL_MOCKUPS[activeModalProduct.image] || REAL_MOCKUPS['tshirt-oversize']}
                alt={activeModalProduct.name}
                className="w-full h-full object-contain p-2"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-[#ff2a5f] text-xs font-black uppercase border border-pink-500/30">
                {activeModalProduct.badge || 'Ficha Técnica'}
              </span>
              <span className="text-xs text-slate-400 light:text-slate-500 font-semibold">{activeModalProduct.gsm}</span>
            </div>

            <h3 className="font-display font-black text-2xl text-white light:text-slate-900">
              {activeModalProduct.name}
            </h3>

            <div className="flex items-baseline gap-3 my-3">
              <span className="text-2xl font-black gradient-text-price">
                {activeModalProduct.price.toFixed(2)} €
              </span>
              {activeModalProduct.originalPrice && (
                <span className="text-sm text-slate-400 light:text-slate-500 line-through">
                  {activeModalProduct.originalPrice.toFixed(2)} €
                </span>
              )}
              <span className="text-xs font-bold text-emerald-400 light:text-emerald-800 bg-emerald-500/20 light:bg-emerald-50 px-2 py-0.5 rounded border border-emerald-500/30">
                -15% con código SUBLI15
              </span>
            </div>

            <p className="text-sm text-slate-300 light:text-slate-600 leading-relaxed mb-4">
              {activeModalProduct.description}
            </p>

            {/* Technical Specifications */}
            <div className="space-y-3 bg-slate-800/60 light:bg-slate-50 p-4 rounded-2xl border border-slate-700/60 light:border-slate-200/80 mb-5">
              <h4 className="text-xs font-bold text-white light:text-slate-900 uppercase tracking-wider">
                Especificaciones Técnicas Textil:
              </h4>
              <ul className="text-xs text-slate-300 light:text-slate-700 space-y-1.5">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Composición:</strong> {activeModalProduct.material}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Gramaje:</strong> {activeModalProduct.gsm}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Área máxima de estampación:</strong> {activeModalProduct.printArea}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Cuidado:</strong> Lavar a 30°C. No destiñe ni necesita plancha del revés.</span>
                </li>
              </ul>
            </div>

            {/* CTA inside modal */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const prod = activeModalProduct;
                  setActiveModalProduct(null);
                  if (onSelectProduct) {
                    onSelectProduct(
                      prod,
                      selectedSizes[prod.id] || prod.sizes[0],
                      selectedColors[prod.id] || prod.colors[0].hex
                    );
                  }
                }}
                className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#ff2a5f] to-[#ff4b78] text-white font-black text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Añadir al Carrito y Pagar</span>
              </button>

              <a
                href={`https://wa.me/34600000000?text=Hola%20SubliShop!%20Quiero%20pedir%20informaci%C3%B3n%20sobre%20${encodeURIComponent(activeModalProduct.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Preguntar por WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
