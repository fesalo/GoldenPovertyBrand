export interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size: string;
  color: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'bizum';
  details: any;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  shippingDetails: ShippingDetails;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}
