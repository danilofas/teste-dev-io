import { Test, TestingModule } from '@nestjs/testing';
import { OrderproductController } from './orderproduct.controller';
import { OrderproductService } from './orderproduct.service';

describe('OrderproductController', () => {
  let controller: OrderproductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderproductController],
      providers: [OrderproductService],
    }).compile();

    controller = module.get<OrderproductController>(OrderproductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
