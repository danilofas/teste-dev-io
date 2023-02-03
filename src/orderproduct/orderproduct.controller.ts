import { Body, Controller, Post } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { CreateOrderproductDto } from './dto/create-orderproduct.dto';
import { OrderproductService } from './orderproduct.service';

@ApiExcludeController()
@Controller('orderproduct')
export class OrderproductController {
  constructor(private readonly orderproductService: OrderproductService) {}

  @Post()
  create(@Body() createOrderproductDto: CreateOrderproductDto) {
    return this.orderproductService.create(createOrderproductDto);
  }
}
