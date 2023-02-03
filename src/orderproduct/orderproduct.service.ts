import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderproductDto } from './dto/create-orderproduct.dto';
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
}
