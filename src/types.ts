export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  isNew?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  productName: string;
  image: string;
  type: 'cart' | 'wishlist';
}
