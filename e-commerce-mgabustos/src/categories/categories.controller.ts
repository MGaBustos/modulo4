import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Get()
	@ApiOperation({ summary: 'Obtener todas las categorías' })
	@ApiResponse({
		status: 200,
		description: 'Listado completo de categorías.',
	})
	getAllCategories() {
		return this.categoriesService.getAllCategories();
	}

	@Get('seeder')
	@ApiOperation({ summary: 'Carga inicial masiva de categorías (Seeder)' })
	@ApiResponse({
		status: 201,
		description: 'Categorías precargadas en la DB.',
	})
	addCategories() {
		return this.categoriesService.addCategories();
	}
}
