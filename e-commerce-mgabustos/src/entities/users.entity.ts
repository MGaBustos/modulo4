import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Orders } from './order.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('users')
export class Users {
	@ApiProperty({
		description: 'UUID v4 generado automáticamente por la base de datos',
		example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
	})
	@PrimaryGeneratedColumn('uuid')
	id?: string;
	@ApiProperty({
		description: 'Correo electrónico único del usuario',
		example: 'juan.perez@example.com',
	})
	@Column({ unique: true })
	email!: string;
	@ApiProperty({
		description: 'Nombre completo del usuario',
		example: 'Juan Pérez',
	})
	@Column({
		type: 'varchar',
		length: 50,
		nullable: false,
	})
	name!: string;
	@ApiProperty({
		description: 'Dirección física de residencia o envío',
		example: 'Av. Corrientes 1234',
	})
	@Column({
		type: 'text',
	})
	address!: string;
	@ApiPropertyOptional({
		description: 'Número de teléfono de contacto',
		example: '11152655999',
	})
	@Column({
		type: 'varchar',
		length: 20,
		nullable: true,
	})
	phone!: string;
	@ApiProperty({
		description:
			'Contraseña del usuario (almacenada encriptada con bcrypt)',
		example: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
	})
	@Column({
		type: 'varchar',
		length: 60,
		nullable: false,
	})
	password!: string;
	@ApiPropertyOptional({
		description: 'País de residencia',
		example: 'Argentina',
	})
	@Column({ nullable: true })
	country?: string;
	@ApiPropertyOptional({
		description: 'Ciudad de residencia',
		example: 'Buenos Aires',
	})
	@Column({ nullable: true })
	city?: string;
	@ApiProperty({
		description: 'Indica si el usuario tiene rol de Administrador',
		example: false,
		default: false,
	})
	@Column({ default: false })
	isAdmin!: boolean;
	@ApiPropertyOptional({
		description: 'Historial de órdenes asociadas al usuario',
		type: () => [Orders],
	})
	@OneToMany(() => Orders, (order) => order.user)
	orders?: Orders[]; // Se removió @JoinColumn de aquí
}
