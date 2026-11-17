import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
	@ApiProperty({
		description: 'ID único del usuario registrado (UUID v4)',
		example: '123e4567-e89b-12d3-a456-426614174000',
		format: 'uuid',
	})
	@IsNotEmpty({ message: 'El id del usuario es requerido' })
	@IsUUID(4, { message: 'El id debe ser uuid v4' })
	userId!: string;
	@ApiProperty({
		description: 'Lista de objetos de productos a comprar (mínimo 1)',
		example: [
			{ id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' },
			{ id: 'b1ffcd00-0d1c-5fg9-cc7e-7cc0ce491b22' },
		],
		type: 'array',
		items: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					format: 'uuid',
					example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
				},
			},
		},
	})
	@IsArray({ message: 'El producto debe ser un array' })
	@ArrayMinSize(1, { message: 'El producto debe tener al menos 1 elemento' })
	products!: { id: string }[];
}
