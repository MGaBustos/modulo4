import {
	Controller,
	Get,
	Post,
	Param,
	Body,
	UseGuards,
	Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { CreateUserDto } from './dto/user.dto';

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
	getUserById(@Param('id') id: string) {
		return this.usersService.getUserById(id);
	}

	@Post()
	addUser(@Body() newUser: CreateUserDto) {
		return this.usersService.addUser({
			...newUser,
			phone: String(newUser.phone),
		});
	}
}
