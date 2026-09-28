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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin)
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
	getUserById(
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<Omit<Users, 'password' | 'isAdmin'> | string> {
		return this.usersService.getUserById(id);
	}
	@Put(':id')
	@UseGuards(AuthGuard)
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
	@UseGuards(AuthGuard)
	deleteUser(@Param('id', ParseUUIDPipe) id: string) {
		return this.usersService.deleteUser(id);
	}
}
