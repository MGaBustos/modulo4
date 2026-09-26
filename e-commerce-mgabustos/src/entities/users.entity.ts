import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import { Orders } from './order.entity';

@Entity('users')
export class Users {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ unique: true })
	email!: string;

	@Column({
		type: 'varchar',
		length: 50,
		nullable: false,
	})
	name!: string;

	@Column({
		type: 'text',
	})
	address!: string;

	@Column({
		type: 'int',
	})
	phone!: string;

	@Column({
		type: 'varchar',
		length: 100,
		nullable: false,
	})
	password!: string;

	@Column({ nullable: true })
	country?: string;

	@Column({ nullable: true })
	city?: string;

	@OneToMany(() => Orders, (order) => order.user)
	@JoinColumn({ name: 'order_id' })
	orders?: Orders[];
}
