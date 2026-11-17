import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../users/dto/user.dto';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get()
	@ApiOperation({ summary: 'Verificar módulo de autenticación' })
	@ApiResponse({
		status: 200,
		description: 'Módulo respondiendo correctamente.',
	})
	getAuth() {
		return this.authService.getAuth();
	}

	@Post('signup')
	@ApiOperation({ summary: 'Registrar un nuevo usuario' })
	@ApiResponse({
		status: 201,
		description: 'Usuario registrado exitosamente.',
	})
	@ApiBadRequestResponse({
		description: 'El email ya existe o las contraseñas no coinciden.',
	})
	signUp(@Body() newUserData: CreateUserDto) {
		return this.authService.signUp(newUserData);
	}

	@Post('signin')
	@ApiOperation({ summary: 'Iniciar sesión y obtener Token JWT' })
	@ApiResponse({
		status: 200,
		description: 'Autenticación exitosa. Devuelve el token Bearer JWT.',
	})
	@ApiBadRequestResponse({ description: 'Email o contraseña incorrectos.' })
	signIn(@Body() credentials: LoginUserDto) {
		const { email, password } = credentials;
		return this.authService.signIn(email, password);
	}
}
