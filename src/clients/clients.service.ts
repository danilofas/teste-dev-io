import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { cpf } from 'cpf-cnpj-validator';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client)
    private clientModel: typeof Client,
  ) {}
  create(createClientDto: CreateClientDto) {
    if (!cpf.isValid(createClientDto.cpf)) throw new Error('CPF inválido!');

    if (
      !createClientDto.name ||
      !createClientDto.cpf ||
      !createClientDto.email ||
      !createClientDto.address ||
      !createClientDto.city
    )
      throw new Error('Faltam dados para criar o cliente');

    return this.clientModel.create({
      name: createClientDto.name,
      cpf: createClientDto.cpf,
      email: createClientDto.email,
      phone: createClientDto.phone,
      address: createClientDto.address,
      city: createClientDto.city,
    });
  }

  findAll() {
    return this.clientModel.findAndCountAll();
  }

  findOne(id: string) {
    return this.clientModel.findByPk(id);
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientModel.update(updateClientDto, {
      where: {
        id: id,
      },
    });
  }

  async remove(id: string) {
    await this.clientModel
      .destroy({
        where: {
          id: id,
        },
      })
      .then((result) => {
        if (result !== 0) {
          return { message: 'Cliente removido com sucesso' };
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
