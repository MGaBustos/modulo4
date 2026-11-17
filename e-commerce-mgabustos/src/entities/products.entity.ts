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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({
	name: 'products',
})
export class Products {
	@ApiProperty({
		description: 'uuid v4 generado por DB',
	})
	@PrimaryGeneratedColumn('uuid')
	id!: string;
	@ApiProperty({
		description: 'Nombre único del producto',
		example: 'Teclado Mecánico RGB',
	})
	@Column({
		type: 'varchar',
		length: 50,
		unique: true,
		nullable: false,
	})
	name!: string;
	@ApiProperty({
		description:
			'Descripción detallada de las características del producto',
		example:
			'Teclado mecánico con switches red, retroiluminación RGB y conexión USB-C',
	})
	@Column({
		type: 'text',
		nullable: false,
	})
	description!: string;
	@ApiProperty({
		description: 'Precio unitario del producto con 2 decimales',
		example: 299.99,
		type: Number,
	})
	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2,
		nullable: false,
	})
	price!: number;
	@ApiProperty({
		description: 'Unidades disponibles en inventario',
		example: 50,
	})
	@Column({
		type: 'int',
		nullable: false,
	})
	stock!: number;
	@ApiPropertyOptional({
		description: 'URL de la imagen ilustrativa del producto',
		example:
			'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png',
	})
	@Column({
		type: 'text',
		default:
			'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
	})
	imgUrl?: string;
	@ApiPropertyOptional({
		description: 'Categoría a la que pertenece el producto',
		type: () => Categories,
	})
	@ManyToOne(() => Categories, (category: Categories) => category.products)
	@JoinColumn({ name: 'category_id' })
	category!: Categories;
	@ApiPropertyOptional({
		description: 'Detalles de órdenes en las que se incluyó este producto',
		type: () => [OrderDetails],
	})
	@ManyToMany(
		() => OrderDetails,
		(orderDetails: OrderDetails) => orderDetails.products,
	)
	orderDetails!: OrderDetails[];
}
