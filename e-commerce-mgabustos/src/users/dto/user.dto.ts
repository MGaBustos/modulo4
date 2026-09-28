import { PickType } from '@nestjs/swagger';
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
	Validate,
} from 'class-validator';
import { MatchPassword } from '../../decorators/matchPassword.decorator';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiHideProperty()
	id?: string;
	/**
	 * Debe ser un string de entre 3 y 80 caracteres
	 * No puede estar vacío
	 * @example 'Test User 001'
	 */
	@IsNotEmpty({ message: 'Nombre no puede estar vacío' })
	@IsString({ message: 'Nombre solo puede contener letras' })
	@MinLength(3, { message: 'Nombre debe ser de al menos 3 caracteres' })
	@MaxLength(80, { message: 'Nombre no puede tener mas de 80 caracteres' })
	name!: string;

	/**
	 * Debe ser un email valido
	 * No puede estar vacío
	 * @example 'testuser001@mail.com'
	 */
	@IsNotEmpty({ message: 'Email no puede estar vacío' })
	@IsEmail({}, { message: 'Email debe ser un email' })
	email!: string;
	/**
	 * Debe tener entre 8 y 15 caracteres
	 * Debe contener al menos 1 mayuscula, 1 minuscula, 1 simbolo y 1 numero
	 * No puede estar vacío
	 * @example 'Password123!'
	 */
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
	@IsNotEmpty()
	password!: string;
	/**
	 * Debe ser identica al password
	 * No puede estar vacío
	 * @example 'Password123!'
	 */
	@IsString()
	@IsNotEmpty()
	@Validate(MatchPassword, ['password'])
	confirmPassword: string | undefined;
	/**
	 * Debe ser un numero sin puntos, ni espacios ni simbolos
	 * No puede tener 0 adelante ya que la Sintaxis JSON inválida (Ceros a la izquierda):
	 *  En el formato estándar de JSON, los números no pueden comenzar con 0
	 * (se interpreta como una notación octal no permitida).
	 * No puede estar vacío
	 * @example 111526559999
	 */
	@IsNotEmpty()
	@IsNumber(
		{
			allowNaN: false,
			allowInfinity: false,
		},
		{ message: 'El telefono debe ser real' },
	)
	phone!: string;
	/**
	 * Debe ser un string de entre 3 y 80 caracteress
	 * No puede estar vacío
	 * @example 'Test street 123'
	 */
	@IsString()
	@MinLength(3, { message: 'Dirección debe ser de al menos 3 caracteres' })
	@MaxLength(80, { message: 'Dirección debe ser de no mas de 80 caracteres' })
	address!: string;
	/**
	 * Debe ser un string de entre 5 y 20 caracteress
	 * No puede estar vacío
	 * @example 'Test country'
	 */
	@IsString()
	@MinLength(5, { message: 'País debe ser de al menos 5 caracteres' })
	@MaxLength(20, { message: 'País debe ser de no mas de 20 caracteres' })
	country!: string;
	/**
	 * Debe ser un string de entre 5 y 20 caracteress
	 * No puede estar vacío
	 * @example 'Test city'
	 */
	@IsString()
	@MinLength(5, { message: 'Dirección debe ser de al menos 5 caracteres' })
	@MaxLength(20, { message: 'Dirección debe ser de no mas de 20 caracteres' })
	city!: string;
	@ApiHideProperty()
	@IsEmpty()
	isAdmin!: boolean;
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
export class LoginUserDto extends PickType(CreateUserDto, [
	'email',
	'password',
]) {}
