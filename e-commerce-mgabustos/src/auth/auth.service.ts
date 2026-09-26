import { Injectable } from '@nestjs/common';

interface User {
	email: string;
	password: string;
}

interface UsersRepository {
	getUserByEmail(email: string): Promise<User | null>;
}

@Injectable()
export class AuthService {
	usersRepository!: UsersRepository;
	getAuth(): string {
		return 'Auth...';
	}
	async signIn(email: string, password: string) {
		if (!email || !password) return 'Email y Password son requeridos';

		const foundUser = await this.usersRepository.getUserByEmail(email);
		if (!foundUser) return 'Email o password incorrectos';
		if (foundUser.password !== password)
			return 'Email o password incorrectos';
		return 'Usuario logueado (TOKEN)';
	}
}
