import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../entities/products.entity';
import { Categories } from '../entities/categories.entity';
import { allProducts } from '../utils/data';

@Injectable()
export class ProductsRepository {
	constructor(
		@InjectRepository(Products)
		private readonly productsRepository: Repository<Products>,
		@InjectRepository(Categories)
		private readonly categoriesRepository: Repository<Categories>,
	) {}

	async getAllProducts(page: number, limit: number): Promise<Products[]> {
		const skip = (page - 1) * limit;
		const products = await this.productsRepository.find({
			relations: {
				category: true,
			},
			skip: skip,
			take: limit,
		});
		return products;
	}

	async addProducts(): Promise<string> {
		const categories = await this.categoriesRepository.find();
		await Promise.all(
			allProducts.map(async (element) => {
				const category = categories.find(
					(category) => category.name === element.category,
				);

				if (!category) {
					throw new Error(
						`La categoría ${element.category} no existe`,
					);
				} // <-- 1. Llave agregada aquí para cerrar el if

				const product = new Products();
				product.name = element.name;
				product.description = element.description;
				product.price = element.price;
				product.stock = element.stock;
				product.category = category;

				await this.productsRepository
					.createQueryBuilder()
					.insert()
					.into(Products)
					.values(product)
					.orUpdate(
						['description', 'price', 'stock', 'imgUrl'],
						['name'],
					)
					.execute();
			}),
		);

		return 'Productos agregados exitosamente. ¡Bien hecho!';
	}
	async getProductById(id: string): Promise<Products | string> {
		const product = await this.productsRepository.findOneBy({ id });
		if (!product) {
			return `Producto con id ${id} no encontrado`;
		}
		return product;
	}
	async updateProduct(
		id: string,
		productNewData: Products,
	): Promise<Products | null> {
		await this.productsRepository.update(id, productNewData);
		const updatedProduct = await this.productsRepository.findOneBy({ id });
		return updatedProduct;
	}
	async deleteProduct(id: string): Promise<string | null> {
		const product = await this.productsRepository.findOneBy({ id });
		if (!product) return null;
		{
			await this.productsRepository.delete(id);
			return product.id;
		}
	}
}
