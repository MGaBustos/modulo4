import { Module } from '@nestjs/common';
import { Categories } from '../entities/categories.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([Categories])],
	controllers: [CategoriesController],
	providers: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
