import { Product } from '../types';
import { motion } from 'motion/react';
import { ShoppingBag, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onClick, isWishlisted, onToggleWishlist }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col"
    >
      <div 
        className="relative aspect-[4/5] overflow-hidden bg-[#1E1E1E] rounded-sm mb-5 cursor-pointer"
        onClick={() => onClick(product)}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest z-10">
            Новинка
          </span>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
        </button>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-white text-black px-6 py-3 flex items-center gap-2 hover:bg-[#D4AF37] transition-colors font-medium text-sm tracking-wider uppercase shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
          >
            <ShoppingBag className="w-4 h-4" />
            До кошика
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-grow px-1 cursor-pointer" onClick={() => onClick(product)}>
        <p className="text-sm text-gray-300 line-clamp-3 mb-4 flex-grow font-light leading-relaxed group-hover:text-[#D4AF37] transition-colors">{product.description}</p>
        <div className="text-xl text-[#D4AF37] font-serif italic">{product.price} ₴</div>
      </div>
    </motion.div>
  );
}
