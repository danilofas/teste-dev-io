import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Client } from '../../clients/entities/client.entity';
import { OrderProduct } from '../../orderproduct/entities/orderproduct.entity';
import { Product } from '../../products/entities/product.entity';
import { OrderStatus } from '../enums/order-status.enum';

@Table({
  tableName: 'orders',
})
export class Order extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  amount: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  change: number;

  @Column({ type: DataType.STRING, allowNull: true })
  observation: string;

  @ForeignKey(() => Client)
  @Column({ type: DataType.UUID, allowNull: false })
  clientId: string;

  @BelongsTo(() => Client)
  client: Client;

  @BelongsToMany(() => Product, () => OrderProduct)
  products: Product[];

  @Column({
    type: DataType.ENUM('CASH', 'CREDIT', 'DEBIT', 'PIX', 'TRANSFER', 'APP'),
    allowNull: true,
  })
  payment: string[];

  @Column({
    type: DataType.ENUM(
      'OPEN',
      'CLOSED',
      'CANCELLED',
      'INPROGRESS',
      'PAID',
      'OUTFORDELIVERY',
    ),
    allowNull: false,
  })
  status: OrderStatus;
}
