import { OrderProduct } from '../entities/orderproduct.entity';
export const OrderProductsProvider = [
  {
    provide: 'OrderProductsRepository',
    useValue: OrderProduct,
  },
];
