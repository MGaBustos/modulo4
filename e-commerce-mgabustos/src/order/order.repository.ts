import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common';
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

	async getOrderById(id: string): Promise<Orders> {
		const order = await this.ormOrdersRepository.findOne({
			where: { id },
			relations: {
				orderDetails: {
					products: true,
				},
			},
		});
		if (!order) {
			throw new NotFoundException(`Orden con id ${id} no encontrada`);
		}
		return order;
	}

	async addOrder(newOrderData: CreateOrderDto): Promise<Orders> {
		const { userId, products } = newOrderData;

		// 1. Validar Usuario
		const user = await this.ormUsersRepository.findOneBy({ id: userId });
		if (!user) {
			throw new NotFoundException(
				`Usuario con id ${userId} no encontrado`,
			);
		}

		// 2. Validar Productos y Stock
		if (!products || products.length === 0) {
			throw new BadRequestException('No se proporcionaron productos');
		}

		const productsArray = await Promise.all(
			products.map(async (element) => {
				const product = await this.ormProductsRepository.findOneBy({
					id: element.id,
				});
				if (!product) {
					throw new NotFoundException(
						`Producto con id ${element.id} no encontrado`,
					);
				}
				if (product.stock <= 0) {
					throw new BadRequestException(
						`El producto ${product.name} no tiene stock suficiente`,
					);
				}

				// Descontar stock
				await this.ormProductsRepository.update(
					{ id: element.id },
					{ stock: product.stock - 1 },
				);
				return product;
			}),
		);

		// 3. Crear Orden
		const order = new Orders();
		order.date = new Date();
		order.user = user;
		const newOrder = await this.ormOrdersRepository.save(order);

		// 4. Calcular total y crear Detalle
		const total = productsArray.reduce(
			(sum, product) => sum + Number(product.price),
			0,
		);

		const orderDetail = new OrderDetails();
		orderDetail.price = Number(total.toFixed(2));
		orderDetail.products = productsArray;
		orderDetail.order = newOrder;
		await this.ormOrderDetailRepository.save(orderDetail);

		// 5. Retornar la orden completa cargada
		const result = await this.ormOrdersRepository.findOne({
			where: { id: newOrder.id },
			relations: {
				orderDetails: {
					products: {
						category: true,
					},
				},
			},
		});

		return result!;
	}
}
