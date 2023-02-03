import { Order } from '../entities/order.entity';
export const OrderProvider = [
  {
    provide: 'OrderRepository',
    useValue: Order,
  },
];
