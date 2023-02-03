import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

describe('ClientsService', () => {
  let service: ClientsService;

  const mockClientsModel = {
    create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
    update: jest.fn().mockImplementation((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getModelToken(Client),
          useValue: mockClientsModel,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create a client', async () => {
    const dto = {
      name: 'João',
      cpf: '00891310100',
      email: 'joaoteste@gmail.com',
      address: 'Rua teste',
      city: 'São Paulo',
      phone: '11999999999',
    };

    expect(await service.create(dto)).toEqual(dto);
  });

  it('should be update a client', async () => {
    const dto = {
      id: '56a8c2b7-94de-4110-85b0-2ba21685ea54',
      name: 'João',
      cpf: '00891310100',
      email: 'joaoteste@gmail.com',
      address: 'Rua teste',
      city: 'São Paulo',
      phone: '11999999999',
    };

    expect(
      await service.update('56a8c2b7-94de-4110-85b0-2ba21685ea54', dto),
    ).toEqual({
      id: {
        address: 'Rua teste',
        city: 'São Paulo',
        cpf: '00891310100',
        email: 'joaoteste@gmail.com',
        id: '56a8c2b7-94de-4110-85b0-2ba21685ea54',
        name: 'João',
        phone: '11999999999',
      },
      where: {
        id: '56a8c2b7-94de-4110-85b0-2ba21685ea54',
      },
    });
  });
});
