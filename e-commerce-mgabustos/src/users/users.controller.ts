import {
	Controller,
	Get,
	Param,
	Body,
	UseGuards,
	Query,
	ParseUUIDPipe,
	Put,
	Delete,
	BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { UpdateUserDto } from './dto/user.dto';
import { Roles } from '../decorators/roles.decorator';
import { Users } from '../entities/users.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../common/roles.enum';
import {
	ApiBearerAuth,
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiParam,
	ApiQuery,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
	ApiBadRequestResponse,
	ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin)
	@ApiOperation({
		summary: 'Obtener lista de usuarios paginada (Solo Admin)',
	})
	@ApiQuery({
		name: 'page',
		required: false,
		example: '1',
		description: 'Número de página',
	})
	@ApiQuery({
		name: 'limit',
		required: false,
		example: '5',
		description: 'Cantidad de elementos por página',
	})
	@ApiResponse({
		status: 200,
		description: 'Lista de usuarios recuperada exitosamente.',
	})
	@ApiUnauthorizedResponse({
		description: 'No se proporcionó token de autorización (401).',
	})
	@ApiForbiddenResponse({
		description: 'Se requiere rol de Administrador para acceder (403).',
	})
	getAllUsers(
		@Query('page') page?: string,
		@Query('limit') limit?: string,
	): Promise<Omit<Users, 'password'>[]> {
		const pageNum = Number(page);
		const limitNum = Number(limit);

		const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
		const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;
		return this.usersService.getAllUsers(validPage, validLimit);
	}

	@Get(':id')
	@UseGuards(AuthGuard, RolesGuard)
	@ApiOperation({ summary: 'Obtener usuario por UUID (Solo Admin)' })
	@ApiParam({
		name: 'id',
		description: 'UUID v4 del usuario',
		example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
	})
	@ApiResponse({
		status: 200,
		description: 'Usuario encontrado exitosamente.',
	})
	@ApiUnauthorizedResponse({
		description: 'No se proporcionó token de autorización (401).',
	})
	@ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
	getUserById(
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<Omit<Users, 'password' | 'isAdmin'> | string> {
		return this.usersService.getUserById(id);
	}

	@Put(':id')
	@UseGuards(AuthGuard)
	@ApiOperation({
		summary: 'Actualizar datos de un usuario por UUID (Solo Admin)',
	})
	@ApiParam({ name: 'id', description: 'UUID v4 del usuario' })
	@ApiResponse({
		status: 200,
		description: 'Usuario actualizado exitosamente.',
	})
	@ApiBadRequestResponse({
		description: 'No se permite modificar la dirección de email.',
	})
	@ApiUnauthorizedResponse({
		description: 'No se proporcionó token de autorización (401).',
	})
	updateUser(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() userNewData: UpdateUserDto,
	) {
		if (userNewData.email) {
			throw new BadRequestException('No se puede modificar el email');
		}
		return this.usersService.updateUser(id, userNewData);
	}

	@Delete(':id')
	@Roles(Role.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	@ApiOperation({ summary: 'Eliminar un usuario por UUID (Solo Admin)' })
	@ApiParam({ name: 'id', description: 'UUID v4 del usuario a eliminar' })
	@ApiResponse({
		status: 200,
		description: 'Usuario eliminado exitosamente.',
	})
	@ApiUnauthorizedResponse({
		description: 'No se proporcionó token de autorización (401).',
	})
	deleteUser(@Param('id', ParseUUIDPipe) id: string) {
		return this.usersService.deleteUser(id);
	}
}
