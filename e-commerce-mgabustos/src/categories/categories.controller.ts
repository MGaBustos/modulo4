import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Get()
	getAllCategories() {
		return this.categoriesService.getAllCategories();
	}

	@Get('seeder')
	addCategories() {
		return this.categoriesService.addCategories();
	}
}
