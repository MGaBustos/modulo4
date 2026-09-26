import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from '../entities/orderDetails.entity';
import { Orders } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { Products } from '../entities/products.entity';
import { Users } from '../entities/users.entity';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderRepository {
	constructor(
		@InjectRepository(Orders)
		private ormOrdersRepository: Repository<Orders>,
		@InjectRepository(OrderDetails)
		private ormOrderDetailRepository: Repository<OrderDetails>,
		@InjectRepository(Users)
		private ormUsersRepository: Repository<Users>,
		@InjectRepository(Products)
		private ormProductsRepository: Repository<Products>,
	) {}

	async getOrderById(id: string): Promise<Orders | string> {
		const order = await this.ormOrdersRepository.findOne({
			where: { id },
			relations: {
				orderDetails: {
					products: true,
				},
			},
		});
		if (!order) {
			return `Orden con id ${id} no encontrada`;
		}
		return order;
	}

	async addOrder(newOrderData: CreateOrderDto): Promise<Orders[] | string> {
		const { userId, products } = newOrderData;
		const user = await this.ormUsersRepository.findOneBy({ id: userId });
		if (!user) {
			return `Usuario con id ${userId} no encontrado`;
		}
		const order = new Orders();
		order.date = new Date();
		order.user = user;
		const newOrder = await this.ormOrdersRepository.save(order);

		if (!products) {
			return 'No se proporcionaron productos';
		}

		const productsArray = await Promise.all(
			products.map(async (element) => {
				const product = await this.ormProductsRepository.findOneBy({
					id: element.id,
				});
				if (!product) {
					return `Producto con id ${element.id} no encontrado`;
				}
				await this.ormProductsRepository.update(
					{ id: element.id },
					{ stock: product.stock - 1 },
				);
				return product;
			}),
		);
		const total = productsArray.reduce(
			(sum, product) => sum + Number((product as Products).price),
			0,
		);

		const orderDetail = new OrderDetails();
		orderDetail.price = Number(Number(total).toFixed(2));
		orderDetail.products = productsArray as Products[];
		orderDetail.order = newOrder;
		await this.ormOrderDetailRepository.save(orderDetail);

		return await this.ormOrdersRepository.find({
			where: { id: newOrder.id },
			relations: {
				orderDetails: {
					products: {
						category: true,
					},
				},
			},
		});
	}
}
