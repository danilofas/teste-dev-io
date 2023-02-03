import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from 'src/clients/entities/client.entity';
import { OrderProduct } from 'src/orderproduct/entities/orderproduct.entity';
import { Product } from 'src/products/entities/product.entity';
import { ClientProvider } from '../clients/provider/client.provider';
import { OrderProductsProvider } from '../orderproduct/provider/orderproducts.provider';
import { ProductProvider } from '../products/provider/product.provider';
import { OrdersActionsController } from './controllers/orders-actions.controller';
import { OrdersController } from './controllers/orders.controller';
import { Order } from './entities/order.entity';
import { OrdersActionService } from './services/orders-actions.service';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderProduct, Product, Client])],
  controllers: [OrdersController, OrdersActionsController],
  providers: [
    OrdersService,
    OrdersActionService,
    ...OrderProductsProvider,
    ...ProductProvider,
    ...ClientProvider,
  ],
})
export class OrdersModule {}
