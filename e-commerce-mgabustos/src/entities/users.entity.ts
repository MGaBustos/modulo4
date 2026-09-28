import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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
		type: 'varchar', // Cambiado de 'int' a 'varchar' para evitar desbordamiento de enteros
		length: 20,
		nullable: true,
	})
	phone!: string;

	@Column({
		type: 'varchar',
		length: 60,
		nullable: false,
	})
	password!: string;

	@Column({ nullable: true })
	country?: string;

	@Column({ nullable: true })
	city?: string;

	@OneToMany(() => Orders, (order) => order.user)
	orders?: Orders[]; // Se removió @JoinColumn de aquí
}
