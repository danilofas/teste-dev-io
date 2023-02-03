import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersActionService } from '../services/orders-actions.service';

@ApiTags('orders-actions')
@Controller('orders-actions')
export class OrdersActionsController {
  constructor(private readonly ordersActionService: OrdersActionService) {}

  @Put('add-product/:idOrder')
  updateAddProducts(
    @Param('idOrder') idOrder: string,
    @Body()
    productsToUpdate: [],
  ) {
    if (!idOrder || !productsToUpdate) {
      throw new BadRequestException(
        'idOrder e productsToUpdate são obrigatórios',
      );
    }

    return this.ordersActionService.updateAddProducts(
      idOrder,
      productsToUpdate,
    );
  }

  @Put('remove-product/:idOrder')
  updateRemoveProducts(
    @Param('idOrder') idOrder: string,
    @Body() productsToUpdate: string[],
  ) {
    return this.ordersActionService.updateRemoveProducts(
      idOrder,
      productsToUpdate,
    );
  }

  @Put('finalize/:idOrder')
  updateFinishOrder(@Param('idOrder') idOrder: string) {
    return this.ordersActionService.updateFinishOrder(idOrder);
  }

  @Put('cancel/:idOrder')
  updateCancelOrder(@Param('idOrder') idOrder: string) {
    return this.ordersActionService.updateCancelOrder(idOrder);
  }

  @Put('print/:idOrder')
  updatePrintOrder(@Param('idOrder') idOrder: string) {
    return this.ordersActionService.updatePrintOrder(idOrder);
  }

  @Get('list-all-orders-in-progress')
  findAll() {
    return this.ordersActionService.findAll();
  }

  @Get('order-resume/:idOrder')
  findOne(@Param('idOrder') idOrder: string) {
    return this.ordersActionService.getResumeOrder(idOrder);
  }
}
