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
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../common/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
	ApiBearerAuth,
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiParam,
	ApiQuery,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get()
	@ApiOperation({ summary: 'Obtener lista de productos paginada' })
	@ApiQuery({ name: 'page', required: false, example: '1' })
	@ApiQuery({ name: 'limit', required: false, example: '5' })
	@ApiResponse({ status: 200, description: 'Lista de productos dada.' })
	getAllProducts(@Query('page') page: string, @Query('limit') limit: string) {
		if (page && limit)
			return this.productsService.getAllProducts(
				Number(page),
				Number(limit),
			);
		return this.productsService.getAllProducts(1, 5);
	}

	@Get('seeder')
	@ApiOperation({ summary: 'Carga inicial masiva de productos (Seeder)' })
	@ApiResponse({
		status: 201,
		description: 'Productos precargados en la DB.',
	})
	addProducts() {
		return this.productsService.addProducts();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener detalle de un producto por UUID' })
	@ApiParam({ name: 'id', description: 'UUID v4 del producto' })
	@ApiResponse({ status: 200, description: 'Producto encontrado.' })
	getProductsById(@Param('id') id: string): Promise<Products | string> {
		return this.productsService.getProductsById(id);
	}

	@Put(':id')
	@ApiBearerAuth()
	@Roles(Role.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	@ApiOperation({ summary: 'Actualizar un producto (Solo Admin)' })
	@ApiParam({ name: 'id', description: 'UUID v4 del producto' })
	@ApiResponse({ status: 200, description: 'Producto actualizado.' })
	@ApiUnauthorizedResponse({
		description: 'Token de autenticación faltante o inválido (401).',
	})
	@ApiForbiddenResponse({
		description: 'Se requiere rol de Administrador (403).',
	})
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
	@ApiOperation({ summary: 'Eliminar un producto por UUID' })
	@ApiParam({ name: 'id', description: 'UUID v4 del producto' })
	@ApiResponse({ status: 200, description: 'Producto eliminado.' })
	removeOne(@Param('id') id: string) {
		return this.productsService.removeOne(id);
	}
}
