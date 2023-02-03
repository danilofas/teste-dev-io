import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/entities/client.entity';
import { OrderProduct } from './orderproduct/entities/orderproduct.entity';
import { OrderproductModule } from './orderproduct/orderproduct.module';
import { Order } from './orders/entities/order.entity';
import { OrdersModule } from './orders/orders.module';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: join(__dirname, 'db.sqlite'),
      autoLoadModels: true,
      storage: './src/database/db.sqlite',
      models: [Product, Order, Client, OrderProduct],
    }),
    ProductsModule,
    OrdersModule,
    ClientsModule,
    OrderproductModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
