import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderProduct } from '../orderproduct/entities/orderproduct.entity';
import { Order } from './entities/order.entity';
import { OrdersService } from './services/orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockOrderModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getModelToken(Order),
          useValue: mockOrderModel,
        },
        {
          provide: getModelToken(OrderProduct),
          useValue: mockOrderModel,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
