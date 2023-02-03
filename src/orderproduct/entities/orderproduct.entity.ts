import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Table({
  tableName: 'orderproducts',
})
export class OrderProduct extends Model {
  @ForeignKey(() => Order)
  @Column
  orderId: string;

  @ForeignKey(() => Product)
  @Column
  productId: string;

  @Column({ type: DataType.NUMBER, allowNull: false })
  quantity: number;
}
