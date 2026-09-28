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

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@UseGuards(AuthGuard)
	getAllUsers(
		@Query('page') page?: string,
		@Query('limit') limit?: string,
	): any {
		const pageNum = Number(page);
		const limitNum = Number(limit);

		const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
		const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;
		return this.usersService.getAllUsers(validPage, validLimit);
	}
	@Get(':id')
	@UseGuards(AuthGuard)
	getUserById(@Param('id', ParseUUIDPipe) id: string) {
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
