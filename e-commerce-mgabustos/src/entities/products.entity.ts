import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	ManyToMany,
} from 'typeorm';
import { Categories } from './categories.entity';
import { OrderDetails } from './orderDetails.entity';

@Entity({
	name: 'products',
})
export class Products {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({
		type: 'varchar',
		length: 50,
		unique: true,
		nullable: false,
	})
	name!: string;

	@Column({
		type: 'text',
		nullable: false,
	})
	description!: string;

	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2,
		nullable: false,
	})
	price!: number;

	@Column({
		type: 'int',
		nullable: false,
	})
	stock!: number;

	@Column({
		type: 'text',
		default:
			'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
	})
	imgUrl?: string;

	@ManyToOne(() => Categories, (category: Categories) => category.products)
	@JoinColumn({ name: 'category_id' })
	category!: Categories;

	@ManyToMany(
		() => OrderDetails,
		(orderDetails: OrderDetails) => orderDetails.products,
	)
	orderDetails!: OrderDetails[];
}
