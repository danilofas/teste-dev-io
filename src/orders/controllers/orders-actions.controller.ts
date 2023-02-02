import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersActionService } from '../services/orders-actions.service';

@ApiTags('orders-actions')
@Controller('orders-actions')
export class OrdersActionsController {
  constructor(private readonly ordersActionService: OrdersActionService) {}

  @Put('adicionar-produtos/:idOrder')
  updateAddProducts(
    @Param('idOrder') idOrder: string,
    @Body() productsToUpdate: string[],
  ) {
    return this.ordersActionService.updateAddProducts(
      idOrder,
      productsToUpdate,
    );
  }

  @Put('remover-produto/:idOrder')
  updateRemoveProducts(
    @Param('idOrder') idOrder: string,
    @Body() productsToUpdate: string[],
  ) {
    return this.ordersActionService.updateRemoveProducts(
      idOrder,
      productsToUpdate,
    );
  }

  @Put('finalizar/:idOrder')
  updateFinishOrder(@Param('idOrder') idOrder: string) {
    return this.ordersActionService.updateFinishOrder(idOrder);
  }

  //   @Put('cancelar/:idOrder')
  //   updateCancelOrder(@Param('idOrder') idOrder: string) {
  //     return this.ordersActionService.updateCancelOrder(idOrder);
  //   }

  @Put('imprmir/:idOrder')
  updatePrintOrder(@Param('idOrder') idOrder: string) {
    return this.ordersActionService.updatePrintOrder(idOrder);
  }
}
