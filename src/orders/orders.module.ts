import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderProduct } from 'src/orderproduct/entities/orderproduct.entity';
import { Product } from 'src/products/entities/product.entity';
import { OrdersActionsController } from './controllers/orders-actions.controller';
import { OrdersController } from './controllers/orders.controller';
import { Order } from './entities/order.entity';
import { OrderProductsProvider } from './provider/orderproducts.provider';
import { ProductProvider } from './provider/product.provider';
import { OrdersActionService } from './services/orders-actions.service';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderProduct, Product])],
  controllers: [OrdersController, OrdersActionsController],
  providers: [
    OrdersService,
    OrdersActionService,
    ...OrderProductsProvider,
    ...ProductProvider,
  ],
})
export class OrdersModule {}
