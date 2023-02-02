import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productModel.create({
      title: createProductDto.title,
      code: createProductDto.code,
      description: createProductDto.description,
      brand: createProductDto.brand,
      price: createProductDto.price,
    });
  }

  async listFirstTen() {
    return await this.productModel.findAll({
      limit: 10,
    });
  }

  async findByCode(code: number) {
    try {
      if (code === null || code === undefined || code === 0) {
        throw new Error('O código do produto é necessário para pesquisa.');
      } else {
        return await this.productModel.findOne({
          where: {
            code: code,
          },
        });
      }
    } catch (error) {
      return error;
    }
  }

  async findByTitle(title: string) {
    try {
      if (title === null || title === undefined || title === '') {
        throw new Error('O nome do produto  necessário para pesquisa.');
      } else {
        return await this.productModel.findAll({
          where: {
            title: { [Op.like]: `%${title}%` },
          },
        });
      }
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    return await this.productModel.findAndCountAll();
  }

  async findOne(id: string) {
    return await this.productModel.findByPk(id).then((product) => {
      return product;
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.update(updateProductDto, {
      where: {
        id: id,
      },
    });
  }

  remove(id: string) {
    return this.productModel.destroy({
      where: {
        id: id,
      },
    });
  }
}
