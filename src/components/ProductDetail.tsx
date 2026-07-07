import { Product } from '../types';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingBag, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export function ProductDetail({ product, onBack, onAddToCart, isWishlisted, onToggleWishlist }: ProductDetailProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Use product.images if available, otherwise just use the main image.
  const images = product.images || [product.image];

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(images.length - 1, prev + 1));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors mb-8 uppercase tracking-widest text-xs"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад до каталогу
      </button>

      <div className="flex flex-col gap-16">
        {/* Images Stack Section */}
        <div className="w-full relative flex justify-center pb-8">
          <div className="relative w-full max-w-[500px] aspect-[4/5]">
            {images.map((img, idx) => {
              const isPast = idx < currentIndex;
              const offset = Math.max(0, idx - currentIndex);

              return (
                <motion.div
                  key={idx}
                  className="absolute inset-0 rounded-sm overflow-hidden shadow-2xl bg-[#1E1E1E]"
                  initial={false}
                  animate={{
                    x: isPast ? -400 : offset * 12,
                    y: isPast ? 0 : offset * 12,
                    scale: isPast ? 0.8 : 1 - offset * 0.05,
                    zIndex: images.length - idx,
                    opacity: isPast ? 0 : 1 - (offset * 0.3)
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{ pointerEvents: idx === currentIndex ? 'auto' : 'none' }}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} - фото ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {product.isNew && idx === 0 && (
                    <span className="absolute top-6 left-6 bg-[#D4AF37] text-black text-xs font-bold px-4 py-2 uppercase tracking-widest z-10 shadow-lg">
                      Новинка
                    </span>
                  )}
                </motion.div>
              );
            })}

            {images.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="absolute -left-16 sm:-left-20 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#121212] border border-white/10 text-white flex items-center justify-center rounded-full hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all disabled:opacity-30 disabled:hover:bg-[#121212] disabled:hover:text-white disabled:hover:border-white/10 disabled:cursor-not-allowed z-50 shadow-xl"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentIndex === images.length - 1}
                  className="absolute -right-16 sm:-right-20 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#121212] border border-white/10 text-white flex items-center justify-center rounded-full hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all disabled:opacity-30 disabled:hover:bg-[#121212] disabled:hover:text-white disabled:hover:border-white/10 disabled:cursor-not-allowed z-50 shadow-xl"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                {/* Pagination Dots */}
                <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2 z-10">
                  {images.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#D4AF37] w-6' : 'bg-white/20'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Info Section */}
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
          <p className="font-serif text-2xl md:text-3xl text-white mb-6 leading-relaxed font-light">
            {product.description}
          </p>
          <div className="text-4xl text-[#D4AF37] font-serif italic mb-10">{product.price} ₴</div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button 
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-[#D4AF37] text-black px-12 py-5 flex items-center justify-center gap-3 hover:bg-white transition-colors font-bold text-sm tracking-widest uppercase shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
              Додати в кошик
            </button>
            <button 
              onClick={() => onToggleWishlist(product)}
              className={`w-full sm:w-16 h-16 sm:h-auto flex items-center justify-center border ${isWishlisted ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-white/20 text-white hover:border-white/50'} transition-colors rounded-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300`}
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-[#D4AF37]' : ''}`} />
            </button>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10 text-xs text-gray-500 flex flex-col sm:flex-row justify-center gap-8 font-light tracking-wide uppercase w-full">
            <p>• Унікальна ручна робота</p>
            <p>• Ексклюзивний етнічний дизайн</p>
            <p>• Преміальні матеріали</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
