import {
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
	Column,
} from 'typeorm';
import { Users } from './users.entity';
import { OrderDetails } from './orderDetails.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'ORDERS' })
export class Orders {
	@ApiProperty({
		description: 'UUID v4 generado automáticamente por la base de datos',
		example: 'c9b72d11-8f22-4e33-94c4-7dd8ee28a22b',
	})
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ApiProperty({
		description: 'Fecha de creación de la orden de compra',
		example: '28/09/2026',
	})
	@Column()
	date!: Date;
	@ApiPropertyOptional({
		description: 'Detalle de los productos y monto asignado a esta orden',
		type: () => OrderDetails,
	})
	@OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
	@JoinColumn({ name: 'order_id' })
	orderDetails!: OrderDetails;
	@ApiPropertyOptional({
		description: 'Usuario que realizó la compra',
		type: () => Users,
	})
	@ManyToOne(() => Users, (user) => user.orders)
	@JoinColumn({ name: 'user_id' })
	user!: Users;
}
