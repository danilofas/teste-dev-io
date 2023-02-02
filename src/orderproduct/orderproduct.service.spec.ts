import { Test, TestingModule } from '@nestjs/testing';
import { OrderproductService } from './orderproduct.service';

describe('OrderproductService', () => {
  let service: OrderproductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderproductService],
    }).compile();

    service = module.get<OrderproductService>(OrderproductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
