import { Get, Post, Body, Param, Controller, UseGuards } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';

@Controller('orders')
export class OrdersController {
	constructor(private readonly orderService: OrdersService) {}

	@Get(':id')
	@UseGuards(AuthGuard)
	getOrderById(@Param('id') id: string) {
		return this.orderService.getOrderById(id);
	}
	@Post()
	@UseGuards(AuthGuard)
	addOrder(@Body() newOrderData: CreateOrderDto) {
		return this.orderService.addOrder(newOrderData);
	}
}
