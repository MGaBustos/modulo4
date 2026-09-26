import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	@IsNotEmpty({ message: 'El id del usuario es requerido' })
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	@IsUUID(4, { message: 'El id debe ser uuid v4' })
	userId!: string;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	@IsArray({ message: 'El producto debe ser un array' })
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	@ArrayMinSize(1, { message: 'El producto debe tener al menos 1 elemento' })
	products!: { id: string }[];
}
