import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderProduct } from '../../orderproduct/entities/orderproduct.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,

    @InjectModel(OrderProduct)
    private orderProductModel: typeof OrderProduct,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<any> {
    try {
      this.orderModel.create({
        clientId: createOrderDto.clientId,
        amount: createOrderDto.amount,
        observation: createOrderDto.observation,
        payment: createOrderDto.payment,
        change: createOrderDto.change,
        status: 5,
        productsId: createOrderDto.productsId,
      });

      const orderId = await this.findLastOne();

      if (orderId !== null) {
        createOrderDto.productsId.forEach((element) => {
          this.orderProductModel.create({
            orderId: orderId !== null ? orderId.id : 0,
            productId: element.productId,
            quantity: element.quantity,
          });
        });

        const orderCreated = await this.findLastOne();
        return orderCreated;
      }
    } catch (error) {
      return { error: error.message, message: 'Erro ao criar o pedido' };
    }
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.findAll<Order>();
  }

  async findLastOne(): Promise<Order | null> {
    return await this.orderModel.findOne({
      order: [['id', 'DESC']],
    });
  }

  async findOne(id: string): Promise<any> {
    return await this.orderModel.findOne({
      where: { id: id },
    });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      return this.orderModel.update(updateOrderDto, {
        where: { id: id },
      });
    } catch (error) {
      return { error: error.message, message: 'Erro ao atualizar o pedido' };
    }
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
