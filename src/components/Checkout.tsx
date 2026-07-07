import { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  items: CartItem[];
  total: number;
}

export function Checkout({ isOpen, onClose, onBack, items, total }: CheckoutProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    deliveryMethod: 'nova_poshta_branch',
    postOfficeBranch: '',
    paymentMethod: 'card'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order processing
    alert('Дякуємо за замовлення! Ми зв\'яжемось з вами найближчим часом.');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.4, ease: 'circOut' }}
          className="fixed inset-0 bg-[#161616] z-[60] flex flex-col h-full w-full overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 sm:p-10 border-b border-white/5 bg-[#121212] flex-shrink-0">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wide">Оформлення</h2>
            </div>
            <button onClick={onClose} className="p-3 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar p-6 sm:p-10">
            <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Контактні дані */}
                  <div className="space-y-6">
                    <h3 className="text-[#D4AF37] font-serif text-2xl mb-4 border-b border-white/10 pb-4">Контактні дані</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase tracking-widest">Ім'я *</label>
                        <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-[#121212] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase tracking-widest">Прізвище *</label>
                        <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-[#121212] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase tracking-widest">Телефон *</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#121212] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase tracking-widest">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#121212] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Доставка */}
                  <div className="space-y-6">
                    <h3 className="text-[#D4AF37] font-serif text-2xl mb-4 border-b border-white/10 pb-4">Доставка</h3>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 uppercase tracking-widest">Місто *</label>
                      <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-[#121212] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Київ, Львів, Дніпро..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 uppercase tracking-widest">Спосіб доставки *</label>
                      <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} className="w-full bg-[#121212] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none">
                        <option value="nova_poshta_branch">Нова Пошта (Відділення)</option>
                        <option value="nova_poshta_courier">Нова Пошта (Кур'єр)</option>
                        <option value="ukrposhta">Укрпошта</option>
                      </select>
                    </div>
                    {formData.deliveryMethod === 'nova_poshta_branch' && (
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase tracking-widest">Номер відділення *</label>
                        <input required type="text" name="postOfficeBranch" value={formData.postOfficeBranch} onChange={handleChange} className="w-full bg-[#121212] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Відділення №1" />
                      </div>
                    )}
                  </div>

                  {/* Оплата */}
                  <div className="space-y-6">
                    <h3 className="text-[#D4AF37] font-serif text-2xl mb-4 border-b border-white/10 pb-4">Оплата</h3>
                    <div className="space-y-4">
                      <label className="flex items-center gap-4 cursor-pointer group">
                        <div className="w-5 h-5 rounded-full border border-[#D4AF37] flex items-center justify-center">
                          {formData.paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />}
                        </div>
                        <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="hidden" />
                        <span className="text-gray-300 group-hover:text-white transition-colors">Оплата картою (WayForPay, LiqPay)</span>
                      </label>
                      <label className="flex items-center gap-4 cursor-pointer group">
                        <div className="w-5 h-5 rounded-full border border-[#D4AF37] flex items-center justify-center">
                          {formData.paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />}
                        </div>
                        <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="hidden" />
                        <span className="text-gray-300 group-hover:text-white transition-colors">Накладений платіж (при отриманні)</span>
                      </label>
                    </div>
                  </div>

                </form>
              </div>

              {/* Разом */}
              <div className="w-full lg:w-96 flex-shrink-0">
                <div className="bg-[#121212] p-8 border border-white/5 space-y-6 sticky top-0">
                  <h3 className="font-serif text-2xl text-white tracking-wide">Ваше замовлення</h3>
                  <div className="space-y-4 divide-y divide-white/5">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-4 pt-4 first:pt-0 items-center">
                        <img src={item.product.image} alt={item.product.name} className="w-16 h-20 object-cover bg-[#2A2A2A]" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-300 line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.quantity} шт x {item.product.price} ₴</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="text-gray-400 text-sm tracking-widest uppercase">До сплати</span>
                    <span className="font-serif text-3xl text-[#D4AF37]">{total} ₴</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="p-6 sm:p-10 border-t border-white/5 bg-[#121212] flex items-center justify-end flex-shrink-0">
            <button form="checkout-form" type="submit" className="w-full sm:w-auto min-w-[300px] bg-[#D4AF37] text-black px-12 py-5 font-bold tracking-[0.2em] text-sm uppercase hover:bg-white transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
              Підтвердити замовлення
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
