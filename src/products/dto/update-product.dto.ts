import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O titulo do produto é utilizado para nomear o produto',
    example: 'Porção de batatas fritas - 200gr',
  })
  title: string;

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
