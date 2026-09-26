import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersRepository {
	constructor(
		@InjectRepository(Users)
		private readonly ormUsersRepository: Repository<Users>,
	) {}

	async getAllUsers(
		page: number,
		limit: number,
	): Promise<Omit<Users, 'password'>[]> {
		const skip = (page - 1) * limit;
		const allUsers = await this.ormUsersRepository.find({
			skip: skip,
			take: limit,
		});
		return allUsers.map(({ password, ...userNoPassword }) => {
			void password;
			return userNoPassword;
		});
	}

	async getUserById(id: string): Promise<Omit<Users, 'password'> | string> {
		const foundUser = await this.ormUsersRepository.findOne({
			where: { id },
			relations: {
				orders: {
					orderDetails: {
						products: true,
					},
				},
			},
		});
		if (!foundUser)
			throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
		const { password: _password, ...userNoPassword } = foundUser;
		void _password;
		return userNoPassword;
	}

	async getUserByEmail(email: string): Promise<Users | null> {
		return await this.ormUsersRepository.findOneBy({ email });
	}

	async addUser(newUserData: CreateUserDto): Promise<string> {
		const savedUser = await this.ormUsersRepository.save(newUserData);
		if (!savedUser.id)
			throw new NotFoundException(
				'No se pudo obtener el id del usuario guardado',
			);
		return savedUser.id;
	}

	async updateUser(
		id: string,
		newUserData: UpdateUserDto,
	): Promise<Omit<Users, 'password'> | string> {
		const user = await this.ormUsersRepository.findOneBy({ id });
		if (!user)
			throw new NotFoundException(`No existe usuario con id ${id}`);
		const mergedUser = this.ormUsersRepository.merge(user, newUserData);
		const savedUser = await this.ormUsersRepository.save(mergedUser);
		const { password, ...userNoPassword } = savedUser;
		void password;
		return userNoPassword;
	}

	async deleteUser(id: string): Promise<string> {
		const foundUser = await this.ormUsersRepository.findOneBy({ id });
		if (!foundUser)
			throw new NotFoundException(`No existe usuario con id ${id}`);
		await this.ormUsersRepository.remove(foundUser);
		return id;
	}
}
