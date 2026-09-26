import {
	MiddlewareConsumer,
	Module,
	NestModule,
	OnApplicationBootstrap,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ProductsService } from './products/products.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesService } from './categories/categories.service';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [typeormConfig] }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) =>
				configService.get('typeorm')!,
		}),
		UsersModule,
		ProductsModule,
		AuthModule,
		OrderModule,
		CategoriesModule,
	],
	controllers: [],
	providers: [AppService],
})
export class AppModule implements NestModule, OnApplicationBootstrap {
	constructor(
		private readonly categoriesService: CategoriesService,
		private readonly productsService: ProductsService,
	) {}
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
	async onApplicationBootstrap() {
		await this.categoriesService.addCategories();
		await this.productsService.addProducts();
	}
}
