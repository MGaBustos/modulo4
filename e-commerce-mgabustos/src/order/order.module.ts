import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../entities/order.entity';
import { OrderDetails } from '../entities/orderDetails.entity';
import { Users } from '../entities/users.entity';
import { Products } from '../entities/products.entity';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { OrderRepository } from './order.repository';

@Module({
	imports: [
		// Asegúrate de que las 4 entidades estén pasadas en este arreglo:
		TypeOrmModule.forFeature([Orders, OrderDetails, Users, Products]),
	],
	controllers: [OrdersController],
	providers: [OrdersService, OrderRepository],
	exports: [OrdersService, OrderRepository],
})
export class OrderModule {}
