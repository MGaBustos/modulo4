import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { Users } from './entities/users.entity';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get()
	getUsers(): Promise<Omit<Users, 'password'>[]> {
		return this.userService.getAllUsers(1, 5);
	}
}
