import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { OrderProduct } from '../../orderproduct/entities/orderproduct.entity';
import { Order } from '../../orders/entities/order.entity';

@Table({
  tableName: 'products',
})
export class Product extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.NUMBER, allowNull: false, unique: true })
  code: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  brand: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price: number;

  @BelongsToMany(() => Order, () => OrderProduct)
  orders: Order[];
}
