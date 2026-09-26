import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
	constructor(private ordersRepository: OrderRepository) {}

	getOrderById(id: string) {
		return this.ordersRepository.getOrderById(id);
	}
	addOrder(newOrderData: CreateOrderDto) {
		return this.ordersRepository.addOrder(newOrderData);
	}
}
