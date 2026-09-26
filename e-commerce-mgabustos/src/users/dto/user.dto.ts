/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
	IsEmail,
	IsEmpty,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsStrongPassword,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty({ message: 'Nombre no puede estar vacío' })
	@IsString({ message: 'Nombre solo puede contener letras' })
	@MinLength(3, { message: 'Nombre debe ser de al menos 3 caracteres' })
	@MaxLength(80, { message: 'Nombre no puede tener mas de 80 caracteres' })
	name!: string;

	@IsNotEmpty({ message: 'Email no puede estar vacío' })
	@IsEmail({}, { message: 'Email debe ser un email' })
	email!: string;

	@IsNotEmpty({ message: 'Password no puede estar vacío' })
	@IsString()
	@MinLength(8, { message: 'Nombre debe ser de al menos 3 caracteres' })
	@MaxLength(15, { message: 'Nombre no puede tener mas de 15 caracteres' })
	@IsStrongPassword(
		{
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		},
		{
			message:
				'La contraseña debe tener al menos 1 minuscula, 1 mayuscula, 1 numero y 1 simbolo como !"·$%&/',
		},
	)
	password!: string;
	@IsNotEmpty()
	@IsNumber(
		{
			allowNaN: false,
			allowInfinity: false,
		},
		{ message: 'El telefono debe ser real' },
	)
	phone!: string;
	@IsString()
	@MinLength(3, { message: 'Dirección debe ser de al menos 3 caracteres' })
	@MaxLength(80, { message: 'Dirección debe ser de no mas de 80 caracteres' })
	address!: string;
	@IsString()
	@MinLength(5, { message: 'País debe ser de al menos 5 caracteres' })
	@MaxLength(20, { message: 'País debe ser de no mas de 20 caracteres' })
	country!: string;
	@IsString()
	@MinLength(5, { message: 'Dirección debe ser de al menos 5 caracteres' })
	@MaxLength(20, { message: 'Dirección debe ser de no mas de 20 caracteres' })
	city!: string;
}
export class UpdateUserDto {
	@IsEmpty()
	email!: string;
	@IsOptional()
	@IsString()
	@MinLength(5, { message: 'Dirección debe ser de al menos 5 caracteres' })
	@MaxLength(20, { message: 'Dirección debe ser de no mas de 20 caracteres' })
	city!: string;
}
