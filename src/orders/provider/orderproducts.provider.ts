import { OrderProduct } from './../../orderproduct/entities/orderproduct.entity';
export const OrderProductsProvider = [
  {
    provide: 'OrderProductsRepository',
    useValue: OrderProduct,
  },
];
