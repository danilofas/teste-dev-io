import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsController } from './controllers/products.controller';
import { SearchProductsController } from './controllers/searchproducts.controller';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController, SearchProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
