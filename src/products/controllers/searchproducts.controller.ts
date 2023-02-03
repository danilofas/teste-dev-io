import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ProductsService } from '../products.service';

@ApiTags('search-products')
@Controller('search-products')
export class SearchProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('list-top-ten')
  listFirstTen() {
    return this.productsService.listFirstTen();
  }

  @Get('search-by-code/:code')
  findByCode(@Param('code') code: number) {
    return this.productsService.findByCode(code);
  }

  @Get('search-by-title/:title')
  findByTitle(@Param('title') title: string) {
    return this.productsService.findByTitle(title);
  }
}
