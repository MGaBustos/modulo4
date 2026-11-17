import { Get, Post, Body, Param, Controller, UseGuards } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
	constructor(private readonly orderService: OrdersService) {}

	@Get(':id')
	@ApiOperation({
		summary: 'Obtener ordenes por Id (Solo Admin)',
	})
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	getOrderById(@Param('id') id: string) {
		return this.orderService.getOrderById(id);
	}

	@Post()
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@ApiOperation({ summary: 'Crear una nueva orden de compra (Solo Admin)' })
	@ApiResponse({ status: 201, description: 'Orden creada exitosamente.' })
	@ApiUnauthorizedResponse({ description: 'No autorizado (401).' })
	addOrder(@Body() newOrderData: CreateOrderDto) {
		return this.orderService.addOrder(newOrderData);
	}
}
