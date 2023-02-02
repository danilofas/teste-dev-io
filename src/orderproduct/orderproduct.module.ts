import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderProduct } from './entities/orderproduct.entity';
import { OrderproductController } from './orderproduct.controller';
import { OrderproductService } from './orderproduct.service';

@Module({
  imports: [SequelizeModule.forFeature([OrderProduct])],
  controllers: [OrderproductController],
  providers: [OrderproductService],
})
export class OrderproductModule {}
