import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderproductDto } from './dto/create-orderproduct.dto';
import { UpdateOrderproductDto } from './dto/update-orderproduct.dto';
import { OrderProduct } from './entities/orderproduct.entity';

@Injectable()
export class OrderproductService {
  constructor(
    @InjectModel(OrderProduct)
    private orderProductModel: typeof OrderProduct,
  ) {}
  create(createOrderproductDto: CreateOrderproductDto) {
    return this.orderProductModel.create({
      orderId: createOrderproductDto.orderId,
      productId: createOrderproductDto.productId,
    });
  }

  // findAll() {
  //   return this.orderProductModel.findAll();
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} orderproduct`;
  // }

  update(id: number, updateOrderproductDto: UpdateOrderproductDto) {
    return `This action updates a #${id} orderproduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderproduct`;
  }
}
