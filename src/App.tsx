import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Wishlist } from './components/Wishlist';
import { ToastContainer } from './components/ToastContainer';
import { PRODUCTS } from './data';
import { Product, CartItem, ToastMessage } from './types';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo(0, 0);
    }
  }, [selectedProduct]);

  const addToast = (product: Product, type: 'cart' | 'wishlist') => {
    const id = Math.random().toString();
    const title = type === 'cart' ? 'Додано до кошика' : 'Додано до списку бажань';
    
    setToasts(prev => [...prev, { id, title, productName: product.name, image: product.image, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 7000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const categories = ['all', 'Новинки', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (activeCategory === 'Новинки') {
      result = result.filter(p => p.isNew);
    } else if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    return result;
  }, [activeCategory, sortBy]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: Math.random().toString(), product, quantity: 1 }];
    });
    addToast(product, 'cart');
  };

  const handleToggleWishlist = (product: Product) => {
    const exists = wishlistItems.some(item => item.id === product.id);
    if (exists) {
      setWishlistItems(prev => prev.filter(item => item.id !== product.id));
    } else {
      setWishlistItems(prev => [...prev, product]);
      addToast(product, 'wishlist');
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
        wishlistCount={wishlistItems.length}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />
      
      <main className="flex-1">
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            isWishlisted={wishlistItems.some(item => item.id === selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        ) : (
          <>
            <Hero />
            
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                  <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Колекція</h2>
                  <p className="text-gray-400 max-w-xl font-light text-lg leading-relaxed">
                    Кожен виріб створено вручну з використанням якісних матеріалів та натхненням з глибоких етнічних мотивів.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-start md:justify-end">
                  <select 
                    value={activeCategory} 
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="bg-transparent border border-white/10 text-gray-400 text-xs px-4 py-2 outline-none uppercase tracking-widest cursor-pointer hover:border-white/30 transition-colors rounded-none appearance-none text-center sm:text-left"
                  >
                    <option value="all" className="bg-[#121212] text-white">Всі прикраси (Фільтр)</option>
                    <option value="Новинки" className="bg-[#121212] text-white">Новинки</option>
                    {categories.filter(c => c !== 'all' && c !== 'Новинки').map(category => (
                      <option key={category} value={category} className="bg-[#121212] text-white">
                        {category}
                      </option>
                    ))}
                  </select>

                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent border border-white/10 text-gray-400 text-xs px-4 py-2 outline-none uppercase tracking-widest cursor-pointer hover:border-white/30 transition-colors rounded-none appearance-none text-center sm:text-left"
                  >
                    <option value="default" className="bg-[#121212] text-white">За замовчуванням (Сортування)</option>
                    <option value="price-asc" className="bg-[#121212] text-white">Від дешевих до дорогих</option>
                    <option value="price-desc" className="bg-[#121212] text-white">Від дорогих до дешевих</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                {filteredAndSortedProducts.length > 0 ? (
                  filteredAndSortedProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={handleAddToCart} 
                      onClick={setSelectedProduct}
                      isWishlisted={wishlistItems.some(item => item.id === product.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-gray-500 font-light tracking-widest">
                    В цій категорії наразі немає прикрас.
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-[#0a0a0a] border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-serif text-3xl font-bold text-white tracking-widest">be.etno</span>
            <span className="text-[10px] tracking-[0.3em] text-gray-500 uppercase mt-2">Авторські намиста</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Facebook</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Доставка та оплата</a>
          </div>
          <p className="text-sm text-gray-600 text-center md:text-right font-light">
            © {new Date().getFullYear()} be.etno. Всі права захищені.<br/>
            Зроблено з любов'ю до деталей.
          </p>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={handleRemoveFromCart}
      />
      
      <Wishlist 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemove={(id) => handleToggleWishlist(wishlistItems.find(item => item.id === id)!)}
        onAddToCart={handleAddToCart}
      />
      
      <ToastContainer 
        toasts={toasts}
        onClose={removeToast}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />
    </div>
  );
}
