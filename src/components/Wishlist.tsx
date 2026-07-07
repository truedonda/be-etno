import { X, Trash2, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export function Wishlist({ isOpen, onClose, items, onRemove, onAddToCart }: WishlistProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'circOut' }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#161616] border-l border-white/5 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#121212]">
              <h2 className="font-serif text-2xl text-white tracking-wide">Список бажань</h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-5">
                  <Heart className="w-16 h-16 opacity-20" />
                  <p className="text-lg font-light tracking-wide">Ваш список бажань порожній</p>
                  <button 
                    onClick={onClose}
                    className="mt-2 text-[#D4AF37] hover:text-white transition-colors underline underline-offset-8 decoration-white/20 hover:decoration-[#D4AF37]"
                  >
                    Перейти до каталогу
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-5 group">
                      <div className="w-24 h-32 bg-[#2A2A2A] rounded-sm overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col py-1">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-gray-300 font-light text-sm leading-relaxed pr-4 line-clamp-3">{item.description}</p>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-gray-600 hover:text-red-400 transition-colors mt-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-end justify-between mt-auto pt-4">
                          <span className="text-[#D4AF37] font-serif italic text-lg">{item.price} ₴</span>
                          <button 
                            onClick={() => onAddToCart(item)}
                            className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-[#D4AF37] hover:text-black transition-colors text-white"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
