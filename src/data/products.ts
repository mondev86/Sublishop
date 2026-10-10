export interface Product {
  id: string;
  name: string;
  category: 'camisetas' | 'sudaderas' | 'accesorios';
  price: number;
  originalPrice?: number;
  badge?: string;
  badgeColor?: 'pink' | 'violet' | 'teal' | 'orange';
  description: string;
  specs: string[];
  sizes: string[];
  colors: { name: string; hex: string; class: string }[];
  image: string;
  imageAlt: string;
  material: string;
  gsm: string;
  printArea: string;
}

export interface ComingSoonItem {
  id: string;
  name: string;
  category: string;
  expectedDate: string;
  badge: string;
  description: string;
  iconName: string;
  initialVotes: number;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  avatar: string;
  productBought: string;
  rating: number;
  date: string;
  quote: string;
  verified: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'camiseta-clasica',
    name: 'Camiseta Sublimada Clásica',
    category: 'camisetas',
    price: 16.99,
    originalPrice: 19.99,
    badge: 'Más popular',
    badgeColor: 'pink',
    description: 'Camiseta técnica de tacto algodón suave y transpirable. Cuello redondo elástico indeformable y costuras reforzadas.',
    specs: ['XS a XXL · Corte Regular Unisex', 'Transpirable y secado ultra rápido', 'Sublimación full print frontal o espalda', 'No pierde color con los lavados'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Blanco Puro', hex: '#FFFFFF', class: 'bg-white' },
      { name: 'Gris Jaspeado', hex: '#E2E8F0', class: 'bg-slate-200' },
      { name: 'Negro Streetwear', hex: '#1E293B', class: 'bg-slate-800' },
      { name: 'Azul Pastel', hex: '#E0F2FE', class: 'bg-sky-100' }
    ],
    image: 'tshirt-classic',
    imageAlt: 'Camiseta clásica sublimada con arte gráfico streetwear',
    material: '100% Poliéster hilado spun tacto suave algodón 160g',
    gsm: '160 g/m²',
    printArea: 'Hasta 38 x 48 cm (Área completa A3+)'
  },
  {
    id: 'camiseta-oversize',
    name: 'Camiseta Oversize Heavy Streetwear',
    category: 'camisetas',
    price: 21.99,
    originalPrice: 26.99,
    badge: 'Top Ventas',
    badgeColor: 'violet',
    description: 'Corte relajado drop-shoulder con mangas amplias y tejido pesado de 220g. La prenda fetiche de las marcas streetwear actuales.',
    specs: ['S a XL · Fit Boxy Oversized', 'Tejido pesado 220g de caída impecable', 'Sublimación panorámica doble cara (pecho + espalda)', 'Cuello cerrado acanalado de 2.5cm'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanco Nieve', hex: '#FFFFFF', class: 'bg-white' },
      { name: 'Gris Cemento', hex: '#CBD5E1', class: 'bg-slate-300' },
      { name: 'Arena / Off-White', hex: '#F5F5F0', class: 'bg-stone-100' }
    ],
    image: 'tshirt-oversize',
    imageAlt: 'Camiseta Oversize Boxy con sublimación integral trasera',
    material: 'Poliéster Heavy Weight interlock premium tacto ultra suave',
    gsm: '220 g/m²',
    printArea: 'Full Print delantera + trasera panorámica'
  },
  {
    id: 'hoodie-sublimada',
    name: 'Sudadera Hoodie Canguro HD',
    category: 'sudaderas',
    price: 34.99,
    originalPrice: 42.00,
    badge: 'Novedad',
    badgeColor: 'teal',
    description: 'Interior afelpado súper abrigado, bolsillo de canguro frontal y capucha forrada. Colores ultra vivos que resisten el invierno.',
    specs: ['XS a XXL · Corte Moderno Cómodo', 'Interior perchado afelpado 280g', 'Cordones ajustables con punteras metálicas', 'Estampado nítido resistente a la fricción'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Blanco Óptico', hex: '#FFFFFF', class: 'bg-white' },
      { name: 'Gris Niebla', hex: '#E2E8F0', class: 'bg-slate-200' },
      { name: 'Rosa Pastel', hex: '#FCE7F3', class: 'bg-pink-100' }
    ],
    image: 'hoodie-hd',
    imageAlt: 'Sudadera con capucha sublimada con ilustración artística',
    material: 'Exterior poliéster sublimable HD con interior felpa cálida',
    gsm: '280 g/m²',
    printArea: 'Pecho, Espalda completa y opción de mangas'
  },
  {
    id: 'tote-bag-sublimada',
    name: 'Tote Bag Sublimada Lona Pesada',
    category: 'accesorios',
    price: 12.99,
    originalPrice: 15.99,
    badge: 'Favorito',
    badgeColor: 'orange',
    description: 'Bolsa de tela de alta densidad con asas reforzadas de 70 cm. Ideal para ferias, merchandising de ilustradores o uso diario.',
    specs: ['38 x 42 cm · Capacidad 10L', 'Asas largas reforzadas con punto de cruz', 'Sublimación a todo color en ambas caras', 'Lavable a máquina a 30°C sin perder intensidad'],
    sizes: ['Única (38 x 42 cm)'],
    colors: [
      { name: 'Blanco Lona', hex: '#FFFFFF', class: 'bg-white' },
      { name: 'Crudo Natural', hex: '#FDFBF7', class: 'bg-amber-50' }
    ],
    image: 'tote-bag',
    imageAlt: 'Bolsa Tote Bag con diseño floral y tipografía sublimada',
    material: 'Lona poliéster / algodón de alta tenacidad 240g',
    gsm: '240 g/m²',
    printArea: 'Área completa 35 x 38 cm en ambas caras'
  },
  {
    id: 'mochila-sublimada',
    name: 'Mochila Gymsack Streetwear Full-Print',
    category: 'accesorios',
    price: 17.99,
    originalPrice: 22.00,
    badge: 'Nuevo',
    badgeColor: 'teal',
    description: 'Mochila de saco con cuerdas de 8mm ergonómicas y esquinas reforzadas con ojetes metálicos. Ligera, hidrófuga y con colores flúor.',
    specs: ['Talla única · 35 x 45 cm', 'Cuerdas dobles ajustables ultra resistentes', 'Full print total en toda la superficie', 'Tejido hidrófugo fácil de limpiar'],
    sizes: ['Única (35 x 45 cm)'],
    colors: [
      { name: 'Blanco Base', hex: '#FFFFFF', class: 'bg-white' },
      { name: 'Negro Contraste', hex: '#0F172A', class: 'bg-slate-900' }
    ],
    image: 'gymsack',
    imageAlt: 'Mochila saco de cuerdas con estampado geométrico sublimado',
    material: 'Poliéster 300D ripstop impermeable sublimable',
    gsm: '190 g/m²',
    printArea: '360° Toda la cara delantera y trasera'
  }
];

export const COMING_SOON_PRODUCTS: ComingSoonItem[] = [
  {
    id: 'cortavientos-fullprint',
    name: 'Cortavientos Técnico Full-Print',
    category: 'Prendas de exterior',
    expectedDate: 'Próximo mes',
    badge: 'Otoño / Invierno',
    description: 'Tejido cortavientos transpirable e hidrófugo con forro de malla interior y cremallera estanca.',
    iconName: 'Wind',
    initialVotes: 84
  },
  {
    id: 'gorra-5paneles',
    name: 'Gorra Streetwear 5 Paneles',
    category: 'Accesorios de cabeza',
    expectedDate: 'En 3 semanas',
    badge: 'Streetwear',
    description: 'Corona estructurada con visera plana personalizable y cierre de clip regulable en nylon.',
    iconName: 'Sparkles',
    initialVotes: 67
  },
  {
    id: 'calcetines-streetwear',
    name: 'Calcetines Altos Ribbed HD',
    category: 'Calcetería y ropa interior',
    expectedDate: 'En 4 semanas',
    badge: 'Pack x2',
    description: 'Calcetines deportivos canalé con talón y puntera reforzados y caña sublimable a 360 grados.',
    iconName: 'Footprints',
    initialVotes: 52
  },
  {
    id: 'crop-top-tech',
    name: 'Crop Tee Deportivo Streetwear',
    category: 'Moda Femenina',
    expectedDate: 'Próximo mes',
    badge: 'Tendencia',
    description: 'Corte cropped holgado con cuello redondo alto y tejido elástico interlock ultra confortable.',
    iconName: 'Shirt',
    initialVotes: 73
  },
  {
    id: 'bucket-hat',
    name: 'Bucket Hat Pescador Reversible',
    category: 'Accesorios de cabeza',
    expectedDate: 'En 5 semanas',
    badge: 'Doble estilo',
    description: 'Gorro de pescador con dos caras: una sublimada a todo color y la otra en negro sobrio.',
    iconName: 'Compass',
    initialVotes: 41
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos García',
    city: 'Barcelona',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    productBought: 'Camisetas Oversize Heavy Streetwear (x12 para marca de ropa)',
    rating: 5,
    date: 'Hace 4 días',
    quote: 'La caída de las camisetas oversize es una auténtica pasada. El tejido tiene peso real (220g de verdad) y la sublimación no se siente al tacto: es como si el diseño naciera del propio hilo. Llegaron en 48 horas exactas.',
    verified: true
  },
  {
    id: '2',
    name: 'Laura Martín',
    city: 'Madrid',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    productBought: 'Tote Bags de Lona y Camisetas Clásicas para estudio de tattoo',
    rating: 5,
    date: 'Hace 1 semana',
    quote: 'El trato por WhatsApp antes de enviar los archivos fue impecable: me avisaron de cómo optimizar las sombras de mis ilustraciones para que los colores negros no perdieran contraste. Mis clientes están encantados.',
    verified: true
  },
  {
    id: '3',
    name: 'David Sánchez',
    city: 'Valencia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    productBought: 'Sudadera Hoodie Canguro HD personalizada',
    rating: 5,
    date: 'Hace 2 semanas',
    quote: 'Estaba harto del vinilo textil que se agrieta y se despega después de tres lavadoras. Esta sudadera lleva ya 6 lavados a 30 grados y los colores neón siguen exactamente igual de brillantes. Recomendados al 100%.',
    verified: true
  }
];

export const FEATURES = [
  {
    icon: 'PackageCheck',
    title: 'Sin pedido mínimo (desde 1 ud.)',
    description: 'Personaliza una sola prenda única para tu estilo o haz tiradas completas para tu marca, grupo o empresa con descuentos por volumen progresivos.'
  },
  {
    icon: 'Droplets',
    title: 'Tintas ecológicas Oeko-Tex®',
    description: 'Tintas al agua certificadas de base acuosa, hipoalergénicas y 100% libres de disolventes nocivos. Seguras para bebés y respetuosas con el planeta.'
  },
  {
    icon: 'Flame',
    title: 'Fusión térmica molecular',
    description: 'La sublimación no es un plástico pegado encima: la tinta se gasifica y se integra en la estructura del polímero. Cero cuarteado, máxima transpirabilidad.'
  },
  {
    icon: 'Headphones',
    title: 'Asesoría y revisión de arte gratis',
    description: '¿No sabes si tu imagen tiene suficiente resolución? La revisamos manualmente y ajustamos el perfil de color antes de imprimir para un resultado de 10.'
  },
  {
    icon: 'Truck',
    title: 'Envío rápido 48-72h con seguimiento',
    description: 'Fabricación local express. En cuanto tu prenda sale de la plancha térmica de alta presión, te llega un enlace de seguimiento directo a tu móvil.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Garantía de satisfacción 100%',
    description: 'Si tu prenda presenta cualquier defecto de estampación o confección, te la repetimos de inmediato sin preguntas ni costes adicionales.'
  }
];
