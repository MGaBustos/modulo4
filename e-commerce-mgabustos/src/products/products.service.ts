import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from '../entities/products.entity';

@Injectable()
export class ProductsService {
	removeOne(id: string): Promise<Products | string | null> {
		return this.productsRepository.deleteProduct(id);
	}
	findOne(id: string): Promise<Products | string> {
		return this.productsRepository.getProductById(id);
	}
	addOne(createProduct: Products): Products {
		return createProduct;
	}
	constructor(private readonly productsRepository: ProductsRepository) {}
	getAllProducts(page: number, limit: number): Promise<Products[]> {
		return this.productsRepository.getAllProducts(page, limit);
	}
	addProducts() {
		return this.productsRepository.addProducts();
	}

	getProductsById(id: string): Promise<Products | string> {
		return this.productsRepository.getProductById(id);
	}

	updateOne(id: string, productNewData: Products): Promise<Products | null> {
		return this.productsRepository.updateProduct(id, productNewData);
	}

	deleteOne(id: string): Promise<Products | string | null> {
		return this.productsRepository.deleteProduct(id);
	}
}
