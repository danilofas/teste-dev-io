import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentMethods } from '../enums/order-payments-methods.enum';
import { OrderStatus } from '../enums/order-status.enum';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O id dos produtos',
    example: [
      {
        productId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        quantity: 1,
      },
      {
        productId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        quantity: 1,
      },
    ],
  })
  productsId: [{ productId: string; quantity: number }];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O valor total do pedido',
    example: 10.5,
  })
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O valor do troco',
    example: 0.5,
  })
  change: number;

  @IsString()
  @ApiProperty({
    description: 'Observações sobre o pedido para a cozinha',
    example: 'Sem cebola',
  })
  observation: string;

  @IsEnum([10, 20, 30, 40, 50, 60])
  @IsNotEmpty()
  @ApiProperty({
    description:
      'As formas de pagamento, podendo ser uma ou mais formas: 10 - CREDIT, 20 - DEBIT, 30 - CASH, 40 - PIX, 50 - TRANSFER, 60 - APP',
    example: [10, 20],
  })
  payment: PaymentMethods[];

  @IsEnum([0, 1, 2])
  @IsNotEmpty()
  @ApiProperty({
    description:
      'O status do pedido sendo 0 para Em aberto, 1 para Em andamento e 2 para Finalizado',
    example: 0,
  })
  status: OrderStatus;
}
