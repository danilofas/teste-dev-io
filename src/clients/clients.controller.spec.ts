import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { ClientsController } from './controllers/clients.controller';

describe('ClientsController', () => {
  let controller: ClientsController;

  const mockClientsService = {
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
      controllers: [ClientsController],
      providers: [ClientsService],
    })
      .overrideProvider(ClientsService)
      .useValue(mockClientsService)
      .compile();

    controller = module.get<ClientsController>(ClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create a client', () => {
    const dto = {
      name: 'João',
      cpf: '12345678901',
      email: 'joaoteste@gmail.com',
      address: 'Rua teste',
      city: 'São Paulo',
      phone: '11999999999',
    };

    expect(controller.create(dto)).toEqual({
      name: dto.name,
      cpf: dto.cpf,
      email: dto.email,
      address: dto.address,
      city: dto.city,
      phone: dto.phone,
    });

    expect(mockClientsService.create).toBeCalledWith(dto);
  });

  it('should update client', () => {
    const dto = {
      name: 'João',
      cpf: '12345678901',
      email: 'joaoteste@gmail.com',
      address: 'Rua teste',
      city: 'São Paulo',
      phone: '11999999999',
    };

    expect(
      controller.update('56a8c2b7-94de-4110-85b0-2ba21685ea54', dto),
    ).toEqual({
      id: '56a8c2b7-94de-4110-85b0-2ba21685ea54',
      ...dto,
    });

    expect(mockClientsService.update).toHaveBeenCalled();
  });

  it('should remove client', () => {
    expect(controller.remove('56a8c2b7-94de-4110-85b0-2ba21685ea54')).toEqual({
      id: '56a8c2b7-94de-4110-85b0-2ba21685ea54',
    });

    expect(mockClientsService.remove).toHaveBeenCalled();
  });
});
