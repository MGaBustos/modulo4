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

@Entity({
	name: 'ORDERDETAILS',
})
export class OrderDetails {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2,
	})
	price!: number;

	@OneToOne(() => Orders, (order) => order.orderDetails)
	@JoinColumn({ name: 'order_id' })
	order!: Orders;

	@ManyToMany(() => Products, (product) => product.orderDetails)
	@JoinTable({
		name: 'order_details_products', // Nombre de la tabla sin puntos
		joinColumn: { name: 'order_detail_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
	})
	products!: Products[];
}
