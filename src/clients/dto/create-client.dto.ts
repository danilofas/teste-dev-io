import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O nome do cliente é utilizado para identificar o cliente',
    example: 'João da Silva',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(11)
  @ApiProperty({
    description: 'O CPF do cliente é utilizado para identificar o cliente',
    example: '12345678900',
  })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:
      'O email do cliente é utilizado para comunicação com o cliente',
    example: 'joaodasilva@gmail.com',
  })
  email: string;

  @IsString()
  @MaxLength(11)
  @ApiProperty({
    description:
      'O telefone do cliente é utilizado para comunicação com o cliente via whatsapp',
    example: '11999999999',
  })
  phone: string;

  @IsString()
  @ApiProperty({
    description: 'O endereço do cliente é utilizado para entrega do pedido',
    example: 'Rua das Flores, 123',
  })
  address: string;

  @IsString()
  @ApiProperty({
    description: 'A cidade do cliente é utilizada para entrega do pedido',
    example: 'São Paulo',
  })
  city: string;
}
