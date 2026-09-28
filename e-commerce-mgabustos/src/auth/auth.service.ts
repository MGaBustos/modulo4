import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/user.dto';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../common/roles.enum';
@Injectable()
export class AuthService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly jwtService: JwtService,
	) {}

	getAuth(): string {
		return 'Auth...';
	}

	async signUp(newUserData: CreateUserDto) {
		const { email, password } = newUserData;

		const foundUser = await this.usersRepository.getUserByEmail(email);
		if (foundUser) {
			throw new BadRequestException(
				`Ya existe un usuario con email: ${email}`,
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const savedUser = await this.usersRepository.addUser({
			...newUserData,
			password: hashedPassword,
		});

		return {
			message: 'Usuario registrado con éxito',
			userId: savedUser,
		};
	}

	async signIn(
		email: string,
		password: string,
	): Promise<{ message: string; logged: boolean; token: string }> {
		const foundUser = await this.usersRepository.getUserByEmail(email);

		if (!foundUser || !foundUser.password) {
			throw new BadRequestException('Email o password incorrectos');
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			foundUser.password,
		);
		if (!isPasswordValid)
			throw new BadRequestException('Email o password incorrectos');

		const payload = {
			id: foundUser.id,
			roles: foundUser.isAdmin ? [Role.Admin] : [Role.User],
		};
		const token = this.jwtService.sign(payload);
		return {
			message: 'Usuario logueado',
			logged: true,
			token,
		};
	}
}
