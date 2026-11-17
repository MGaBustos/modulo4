import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	ManyToMany,
	JoinTable,
	OneToOne,
} from 'typeorm';
import { Orders } from './order.entity';
import { Products } from './products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
	name: 'ORDERDETAILS',
})
export class OrderDetails {
	@ApiProperty({
		description: 'uuid v4 generado por DB',
	})
	@PrimaryGeneratedColumn('uuid')
	id!: string;
	@ApiProperty({
		description:
			'Monto total o detalle del valor del producto con 2 decimales',
		example: 150.5,
		type: Number,
	})
	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2,
	})
	price!: number;

	@OneToOne(() => Orders, (order) => order.orderDetails)
	@JoinColumn({ name: 'order_id' })
	order!: Orders;
	@ApiProperty({
		description: 'Listado de productos asociados a este detalle de orden',
		type: () => [Products],
	})
	@ManyToMany(() => Products, (product) => product.orderDetails)
	@JoinTable({
		name: 'order_details_products', // Nombre de la tabla sin puntos
		joinColumn: { name: 'order_detail_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
	})
	products!: Products[];
}
