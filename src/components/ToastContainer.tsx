import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Heart, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
}

export function ToastContainer({ toasts, onClose, onOpenCart, onOpenWishlist }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-4">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="bg-[#1A1A1A] border border-white/10 shadow-2xl p-4 flex gap-4 w-80 sm:w-96 items-center rounded-sm"
          >
            <div className="w-16 h-20 bg-black flex-shrink-0 rounded-sm overflow-hidden">
              <img src={toast.image} alt={toast.productName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 py-1">
              <div className="flex items-center gap-2 mb-2">
                {toast.type === 'cart' ? (
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                ) : (
                  <Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                )}
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{toast.title}</span>
              </div>
              <h4 className="text-white font-serif text-lg leading-tight truncate mb-2">{toast.productName}</h4>
              <button
                onClick={() => {
                  onClose(toast.id);
                  if (toast.type === 'cart' && onOpenCart) onOpenCart();
                  if (toast.type === 'wishlist' && onOpenWishlist) onOpenWishlist();
                }}
                className="text-[10px] text-[#D4AF37] uppercase tracking-widest hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-[#D4AF37]"
              >
                Перейти
              </button>
            </div>
            <button 
              onClick={() => onClose(toast.id)}
              className="text-gray-500 hover:text-white transition-colors p-2 -mr-2 self-start"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
