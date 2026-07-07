import { useState } from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Checkout } from './Checkout';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

export function Cart({ isOpen, onClose, items, onRemove }: CartProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleClose = () => {
    setIsCheckoutOpen(false);
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: 'circOut' }}
              className="fixed inset-0 h-full w-full bg-[#161616] z-50 flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 sm:p-10 border-b border-white/5 bg-[#121212]">
                <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wide">Кошик</h2>
                <button onClick={handleClose} className="p-3 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="flex-1 overflow-hidden flex flex-col relative">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-5 p-6">
                    <ShoppingBag className="w-20 h-20 opacity-20" />
                    <p className="text-xl font-light tracking-wide text-center">Ваш кошик порожній</p>
                    <button 
                      onClick={handleClose}
                      className="mt-4 text-[#D4AF37] hover:text-white transition-colors underline underline-offset-8 decoration-white/20 hover:decoration-[#D4AF37] text-lg uppercase tracking-widest"
                    >
                      Перейти до каталогу
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 overflow-x-auto hide-scrollbar flex items-center">
                    <div className="flex gap-8 px-6 sm:px-12 pb-8 pt-8 w-max snap-x snap-mandatory h-full items-center">
                      {items.map((item) => (
                        <div key={item.id} className="flex flex-col gap-6 group w-[280px] sm:w-[360px] flex-shrink-0 snap-center">
                          <div className="w-full aspect-[4/5] bg-[#2A2A2A] rounded-sm overflow-hidden relative shadow-2xl">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <button 
                              onClick={() => onRemove(item.id)}
                              className="absolute top-4 right-4 text-white/70 hover:text-red-400 bg-black/40 backdrop-blur-sm p-3 rounded-full transition-all hover:bg-black/60"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="flex flex-col text-center">
                            <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed mb-4 line-clamp-2">{item.product.description}</p>
                            <div className="flex items-center justify-center gap-6">
                              <span className="text-sm sm:text-base text-gray-400 font-light">Кількість: {item.quantity}</span>
                              <span className="text-[#D4AF37] font-serif italic text-2xl sm:text-3xl">{item.product.price} ₴</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 sm:p-10 border-t border-white/5 bg-[#121212] flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col items-center sm:items-start gap-1">
                    <span className="text-gray-400 text-sm tracking-widest uppercase">Загалом до сплати</span>
                    <span className="font-serif text-4xl text-[#D4AF37]">{total} ₴</span>
                  </div>
                  <button onClick={() => setIsCheckoutOpen(true)} className="w-full sm:w-auto min-w-[300px] bg-[#D4AF37] text-black px-12 py-5 font-bold tracking-[0.2em] text-sm uppercase hover:bg-white transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
                    Оформити замовлення
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Checkout 
        isOpen={isCheckoutOpen} 
        onClose={handleClose}
        onBack={() => setIsCheckoutOpen(false)}
        items={items}
        total={total}
      />
    </>
  );
}
