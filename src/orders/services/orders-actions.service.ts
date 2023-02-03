import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import ThermalPrinter from 'thermal-printer';
import { Client } from '../../clients/entities/client.entity';
import { OrderProduct } from '../../orderproduct/entities/orderproduct.entity';
import { Product } from '../../products/entities/product.entity';
import { Order } from '../entities/order.entity';
import { PaymentMethods } from '../enums/order-payments-methods.enum';

@Injectable()
export class OrdersActionService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,

    @InjectModel(OrderProduct)
    private orderProductModel: typeof OrderProduct,

    @InjectModel(Product)
    private productModel: typeof Product,

    @InjectModel(Client)
    private clientModel: typeof Client,
  ) {}

  async updateAddProducts(idOrder: string, productsToUpdate: any) {
    try {
      if (idOrder !== null) {
        productsToUpdate.forEach(async (element: any) => {
          if (
            (await this.orderProductModel.findOne({
              where: { orderId: idOrder, productId: element },
            })) === null ||
            undefined ||
            false
          ) {
            this.orderProductModel.create({
              orderId: idOrder,
              productId: element.productId,
              quantity: element.quantity,
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
        if (orderFinished.status == 2)
          return {
            message: 'Ordem cancelada, não é possível finalizar a ordem',
          };

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
        console.log(typeof orderFinished.status);
        if (orderFinished.status == 1)
          return {
            message: 'Ordem já finalizado, não é possível cancelar a ordem',
          };

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

  async findAll() {
    try {
      return await this.orderModel.findAll({
        where: { status: 5 },
      });
    } catch (error) {
      return { error: error.message, message: 'Erro ao listar os pedidos' };
    }
  }

  async getResumeOrder(orderId: string) {
    try {
      const orderFounded = await this.orderModel.findOne({
        where: { id: orderId },
      });

      if (!orderFounded) {
        return null;
      }

      const clientOrder = await this.clientModel.findOne({
        where: { id: orderFounded.clientId },
      });
      const productsOrder = await this.orderProductModel.findAll({
        where: { orderId: orderFounded.id },
      });

      const products = await Promise.all(
        productsOrder.map(async (element) => {
          const product = await this.productModel.findOne({
            where: { id: element.productId },
          });

          return {
            id: product?.dataValues.id,
            code: product?.dataValues.code,
            title: product?.dataValues.title,
            price: product?.dataValues.price,
            quantityOfOrder: element.quantity,
            brand: product?.dataValues.brand,
          };
        }),
      );

      return {
        id: orderFounded.id,
        client: clientOrder?.name,
        amount: orderFounded.amount,
        change: orderFounded.change,
        payment: await this.typesOfPayment(orderFounded.payment.toString()),
        productsOrder: products,
        status: orderFounded.status,
        dateOfOrder: orderFounded.createdAt,
      };
    } catch (error) {
      return {
        error: error.message,
        message: 'Erro ao buscar resumo da ordem',
      };
    }
  }

  async typesOfPayment(types: string) {
    const typesSplit = types.split(',');
    const typesOfPayment = [];

    if (typesSplit.indexOf(PaymentMethods.CASH.toString()) > -1) {
      typesOfPayment.push('DINHEIRO');
    }
    if (typesSplit.indexOf(PaymentMethods.CREDIT.toString()) > -1) {
      typesOfPayment.push('CREDITO');
    }
    if (typesSplit.indexOf(PaymentMethods.DEBIT.toString()) > -1) {
      typesOfPayment.push('DEBITO');
    }
    if (typesSplit.indexOf(PaymentMethods.PIX.toString()) > -1) {
      typesOfPayment.push('PIX');
    }
    if (typesSplit.indexOf(PaymentMethods.TRANSFER.toString()) > -1) {
      typesOfPayment.push('TRANSFERENCIA');
    }
    if (typesSplit.indexOf(PaymentMethods.APP.toString()) > -1) {
      typesOfPayment.push('APP');
    }
    return typesOfPayment.join(' - ');
  }
}
