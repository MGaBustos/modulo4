import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../entities/products.entity';

@Injectable()
export class FileUploadService {
	constructor(
		private readonly fileUploadRepository: FileUploadRepository,
		@InjectRepository(Products)
		private readonly ormProductsRepository: Repository<Products>,
	) {}

	async uploadImage(productId: string, file: Express.Multer.File) {
		// 1. Verificar si el producto existe
		const product = await this.ormProductsRepository.findOneBy({
			id: productId,
		});

		if (!product) {
			throw new NotFoundException(
				`Producto con id: ${productId} no encontrado`,
			);
		}

		// 2. Subir imagen a Cloudinary
		const result = await this.fileUploadRepository.uploadImage(file);

		if (!result.secure_url) {
			throw new NotFoundException(`Falla al cargar imagen`);
		}

		// 3. Modificar la propiedad en el objeto e invocar .save()
		product.imgUrl = result.secure_url;
		const updatedProduct = await this.ormProductsRepository.save(product);

		return updatedProduct;
	}
}
