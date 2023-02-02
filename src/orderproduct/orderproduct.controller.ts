import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { CreateOrderproductDto } from './dto/create-orderproduct.dto';
import { UpdateOrderproductDto } from './dto/update-orderproduct.dto';
import { OrderproductService } from './orderproduct.service';

@ApiExcludeController()
@Controller('orderproduct')
export class OrderproductController {
  constructor(private readonly orderproductService: OrderproductService) {}

  @Post()
  create(@Body() createOrderproductDto: CreateOrderproductDto) {
    return this.orderproductService.create(createOrderproductDto);
  }

  // @Get()
  // findAll() {
  //   return this.orderproductService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderproductService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderproductDto: UpdateOrderproductDto,
  ) {
    return this.orderproductService.update(+id, updateOrderproductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderproductService.remove(+id);
  }
}
