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

@Entity({ name: 'ORDERS' })
export class Orders {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	date!: Date;

	@OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
	@JoinColumn({ name: 'order_id' })
	orderDetails!: OrderDetails;
	@ManyToOne(() => Users, (user) => user.orders)
	@JoinColumn({ name: 'user_id' })
	user!: Users;
}
