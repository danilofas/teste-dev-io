import { Product } from 'src/products/entities/product.entity';
export const ProductProvider = [
  {
    provide: 'ProductRepository',
    useValue: Product,
  },
];
