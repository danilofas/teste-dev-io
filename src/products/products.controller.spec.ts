import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockProductsService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
    remove: jest.fn().mockImplementation((id) => {
      return {
        id,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create a product', () => {
    const dto = {
      title: 'Teste',
      code: 123456,
      description: 'Teste',
      brand: 'Teste',
      price: 10,
    };

    expect(controller.create(dto)).toEqual({
      title: dto.title,
      code: dto.code,
      description: dto.description,
      brand: dto.brand,
      price: dto.price,
    });

    expect(mockProductsService.create).toBeCalledWith(dto);
  });

  it('should be update a product', () => {
    const dto = {
      title: 'Teste',
      code: 123456,
      description: 'Teste',
      brand: 'Teste',
      price: 10,
    };

    expect(
      controller.update('56a8c2b7-94de-4110-85b0-2ba21685ea54', dto),
    ).toEqual({
      id: '56a8c2b7-94de-4110-85b0-2ba21685ea54',
      ...dto,
    });

    expect(mockProductsService.create).toBeCalledWith(dto);
  });

  it('should be remove a product', () => {
    expect(controller.remove('56a8c2b7-94de-4110-85b0-2ba21685ea54')).toEqual({
      id: '56a8c2b7-94de-4110-85b0-2ba21685ea54',
    });

    expect(mockProductsService.remove).toBeCalledWith(
      '56a8c2b7-94de-4110-85b0-2ba21685ea54',
    );
  });
});
