import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O titulo do produto é utilizado para nomear o produto',
    example: 'Porção de batatas fritas - 200gr',
  })
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description:
      'O código do produto é utilizado para identificar o produto, podendo ser o mesmo código do cardápio',
    example: 123456789,
  })
  code: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A descrição trás com maior riqueza de detalhes o produto',
    example:
      'Uma porção de batatas fritas que acompanha molho da casa e temperada com sal e pimenta',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A marca do produto é utilizada para identificar a origem',
    example: 'Sadia',
  })
  brand: string;

  @IsNotEmpty()
  @ApiProperty()
  price: number;
}
