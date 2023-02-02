import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderproductDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
