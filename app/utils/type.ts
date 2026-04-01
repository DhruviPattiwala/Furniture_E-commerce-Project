import { type HydratedDocument } from 'mongoose';
import { JwtPayload } from "jwt-decode";


export interface IUser {
  firstName: string,
  lastName: string,
  email: string | undefined,
  password: string,
  profile: string,
  role: string
}

export interface LoginFormInputs {
  email: string;
  password: string;
}
export interface ForgetPwdFormInputs{
  email: string;
  new_password: string;
  confirm_password: string;

}
export interface FilterFormInputs {
  Category: string;
  Price: string;
  Rate: string;
}

export interface ProductFormInputs {
  name: string,
  image: string,
  category: string,
  rating: number,
  price: number,
  stock: number,
  description: string,
  discount: number,
  status: string,
}
export interface products {
  name: string,
  description: string,
  price: number,
  _id: string ,
  image: string,
  discount: number,
  status: string,
  rating: number,
  category: string,
  discountPrice: number,
  stock:number,
  totalSold:number,
  totalRevenue:number,
  shippingAddresses:string,
  DeliverTime:string
}
export interface ProductListProps {
  setSortData: (data: string) => void
  setIsFilterOpen: (data: boolean) => void;
  products: products[];
  resultText: string;
  currentTotal: number;
  loading : boolean;
}
export interface FilterProps {
  isOpen: boolean;
  onClose: () => void;
  setProducts: (data: products[]) => void;
  setCurrentTotal: (data: number) => void;
  setResultText: (data: string) => void;
}


export interface OrderFormInputs {
  firstName: string,
  lastName: string,
  Company: string,
  Country: string,
  Address: string,
  City: string,
  ZipCode: number,
  Phone: string,
  Email: string,
  paymentMethod: string,
}
export interface ContactFormInputs {
  name: string,
  email: string,
  subject: string,
  message: string,
}
export interface SignUpFormInputs extends LoginFormInputs {
  firstName: string,
  lastName: string;
}

export interface SignUpFormInputsWithProfile extends SignUpFormInputs {
 profile:string|undefined|null;
}

export interface category {
  _id: string,
  name: string,
  image: string
}
export interface JwtPayloadType extends JwtPayload {
  id: string;
  role:string;
}
export interface wishListProduct {
  itemID: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface cartProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends cartProduct {
  quantity: number;
}

export interface CartStore {
  cartItems: CartItem[];
  addToCart: (product: cartProduct) => void;
  clearCart: () => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;

}

export interface payloadType {
  user: string;
  itemID : string;
}

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image:string;
}

interface OrderId {
  user: string; 
  date: string;
}

export interface Order {
  _id: OrderId;
  totalOrderAmount: number;
  items: OrderItem[];
  createdAt: string;
  isDelivered:string;
}
export type AdminDocument = HydratedDocument<IUser>;


