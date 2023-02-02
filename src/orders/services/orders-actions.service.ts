import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/products/entities/product.entity';
import ThermalPrinter from 'thermal-printer';
import { OrderProduct } from '../../orderproduct/entities/orderproduct.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersActionService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,

    @InjectModel(OrderProduct)
    private orderProductModel: typeof OrderProduct,

    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async updateAddProducts(idOrder: string, productsToUpdate: string[]) {
    try {
      if (idOrder !== null) {
        productsToUpdate.forEach(async (element) => {
          // console.log(
          //   this.orderProductModel.findOne({
          //     where: { orderId: idOrder, productId: element },
          //   }),
          // );
          if (
            (await this.orderProductModel.findOne({
              where: { orderId: idOrder, productId: element },
            })) === null ||
            undefined ||
            false
          ) {
            this.orderProductModel.create({
              orderId: idOrder,
              productId: element,
            });
          }
        });
      }

      return await this.orderModel.findOne({
        where: { id: idOrder },
      });
    } catch (error) {
      return { error: error.message, message: 'Erro ao atualizar o pedido' };
    }
  }

  async updateRemoveProducts(idOrder: string, productsToUpdate: string[]) {
    try {
      if (idOrder !== null) {
        productsToUpdate.forEach((element) => {
          if (
            this.orderProductModel.findOne({
              where: { orderId: idOrder, productId: element },
            }) !== null ||
            undefined ||
            false
          ) {
            this.orderProductModel.destroy({
              where: { orderId: idOrder, productId: element },
            });
          }
        });
      }
      return await this.orderModel.findOne({
        where: { id: idOrder },
      });
    } catch (error) {
      return { error: error.message, message: 'Erro ao atualizar o pedido' };
    }
  }

  async updateFinishOrder(idOrder: string) {
    try {
      const orderFinished = await this.orderModel.findByPk(idOrder);

      if (orderFinished !== null) {
        orderFinished.status = 1;
        await this.orderModel.update(
          {
            status: orderFinished.status,
          },
          {
            where: { id: idOrder },
          },
        );
        return await this.orderModel.findOne({
          where: { id: idOrder },
        });
      }
    } catch (error) {
      return { error: error.message, message: 'Erro ao finalizar o pedido' };
    }
  }

  async updateCancelOrder(idOrder: string) {
    try {
      const orderFinished = await this.orderModel.findByPk(idOrder);

      if (orderFinished !== null) {
        orderFinished.status = 2;
        await this.orderModel.update(
          {
            status: orderFinished.status,
          },
          {
            where: { id: idOrder },
          },
        );
        return await this.orderModel.findOne({
          where: { id: idOrder },
        });
      }
    } catch (error) {
      return { error: error.message, message: 'Erro ao finalizar o pedido' };
    }
  }

  async updatePrintOrder(orderId: any) {
    const printer = new ThermalPrinter({
      type: 'epson',
      interface: process.env.PRINTER_NAME,
    });
    try {
      const orderFounded = await this.orderModel.findOne({
        where: { id: orderId },
      });

      if (orderFounded !== null) {
        await printer.init();
        printer.alignCenter();
        printer.println('Pedido:');
        printer.println(`Número do pedido: ${orderFounded.id}`);
        printer.println(`Data do pedido: ${orderFounded.createdAt}`);
        printer.println(`Itens do pedido:`);

        const productsOrder = this.orderProductModel.findAll({
          where: { orderId: orderFounded.id },
        });

        if (productsOrder !== null) {
          (await productsOrder).forEach(async (element) => {
            const product = await this.productModel.findOne({
              where: { id: element.productId },
            });

            if (product !== null) {
              printer.println(`${element.quantity} x ${product.title}`);
            }
          });
        }
        printer.println('Total do pedido:');
        printer.println(`R$ ${orderFounded.amount}`);
        printer.println('Forma de pagamento:');
        printer.println(`${orderFounded.payment}`);
        if (orderFounded.payment.indexOf('CASH') > -1) {
          printer.println('Troco:');
          printer.println(`${orderFounded.change}`);
        }
        printer.println('Obrigado pela sua compra!');
        printer.cut();
        await printer.execute();

        return { message: 'Pedido impresso com sucesso' };
      }
    } catch (error) {
      return { error: error.message, message: 'Erro ao imprimir o pedido' };
    }
  }
}
