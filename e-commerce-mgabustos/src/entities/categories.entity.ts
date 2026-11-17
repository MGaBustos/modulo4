import {
	Column,
	PrimaryGeneratedColumn,
	Entity,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import { Products } from './products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'categories' })
export class Categories {
	@ApiProperty({
		description: 'uuid v4 generado por DB',
	})
	@PrimaryGeneratedColumn('uuid')
	id!: string;
	@ApiProperty({
		description: 'Nombre de la categoría',
		example: 'smartphone',
	})
	@Column({
		type: 'varchar',
		nullable: true,
		length: 50,
		unique: true,
	})
	name!: string;

	@OneToMany(() => Products, (product) => product.category)
	@JoinColumn()
	products!: Products[];
}
