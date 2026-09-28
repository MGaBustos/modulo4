import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from '../entities/products.entity';
import { AuthGuard } from '../auth/guards/auth/auth.guard';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}
	@Get()
	getAllProducts(@Query('page') page: string, @Query('limit') limit: string) {
		if (page && limit)
			return this.productsService.getAllProducts(
				Number(page),
				Number(limit),
			);
		return this.productsService.getAllProducts(1, 5);
	}
	@Get('seeder')
	addProducts() {
		return this.productsService.addProducts();
	}
	@Get(':id')
	getProductsById(@Param('id') id: string): Promise<Products | string> {
		return this.productsService.getProductsById(id);
	}
	@Put(':id')
	@UseGuards(AuthGuard)
	updateProduct(
		@Param('id') id: string,
		@Body() productNewData: Products,
	): Products {
		return this.productsService.updateOne(
			id,
			productNewData,
		) as unknown as Products;
	}
	@Delete(':id')
	removeOne(@Param('id') id: string) {
		return this.productsService.removeOne(id);
	}
}
