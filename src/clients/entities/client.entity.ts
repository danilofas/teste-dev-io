import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/orders/entities/order.entity';

@Table({
  tableName: 'clients',
})
export class Client extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  cpf: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: true })
  address: string;

  @Column({ type: DataType.STRING, allowNull: true })
  city: string;

  @HasMany(() => Order)
  orders: Order[];
}
