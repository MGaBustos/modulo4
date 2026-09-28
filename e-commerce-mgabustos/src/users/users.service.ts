import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from '../entities/users.entity';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async getAllUsers(
		page: number,
		limit: number,
	): Promise<Omit<Users, 'password'>[]> {
		return await this.usersRepository.getAllUsers(page, limit);
	}

	async getUserById(
		id: string,
	): Promise<Omit<Users, 'password' | 'isAdmin'> | string> {
		return await this.usersRepository.getUserById(id);
	}

	async getUserByEmail(email: string): Promise<Users | null> {
		return await this.usersRepository.getUserByEmail(email);
	}

	async updateUser(
		id: string,
		newUserData: UpdateUserDto,
	): Promise<Omit<Users, 'password'> | string> {
		return await this.usersRepository.updateUser(id, newUserData);
	}

	async deleteUser(id: string): Promise<string> {
		return await this.usersRepository.deleteUser(id);
	}
}
