import { ShoppingBag, Menu, X, Heart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  wishlistCount: number;
  onWishlistClick: () => void;
}

export function Header({ cartCount, onCartClick, wishlistCount, onWishlistClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#121212]/90 backdrop-blur-md border-b border-white/10">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <button className="p-2 -ml-2 text-gray-400 hover:text-white sm:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <a href="#" className="font-serif text-2xl tracking-widest text-white ml-2 sm:ml-0 font-bold">
              be.etno
            </a>
          </div>
          
          <nav className="hidden sm:flex space-x-8">
            <a href="#" className="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors">Колекція</a>
            <a href="#" className="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors">Про бренд</a>
            <a href="#" className="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors">Контакти</a>
          </nav>

          <div className="flex items-center gap-2">
            <button 
              onClick={onWishlistClick}
              className="p-2 text-gray-400 hover:text-white relative group"
            >
              <Heart className="w-6 h-6 group-hover:text-[#D4AF37] transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-black">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              onClick={onCartClick}
              className="p-2 text-gray-400 hover:text-white relative group"
            >
              <ShoppingBag className="w-6 h-6 group-hover:text-[#D4AF37] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
