import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest<{
			user: any;
			headers: { authorization?: string };
		}>();

		const authHeader = request.headers.authorization;

		if (!authHeader) {
			throw new UnauthorizedException(
				'No se proporcionó token de autorización',
			);
		}
		const [type, token] = authHeader.split('');

		if (type !== 'Bearer' || !token) {
			throw new UnauthorizedException(
				'No se proporcionó token de autorización',
			);
		}
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const payload = this.jwtService.verify(token, {
				secret: process.env.JWT_SECRET,
			});
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			request.user = payload;
			return true;
		} catch (error) {
			if ((error as Error).name === 'TokenExpiredError') {
				throw new UnauthorizedException('El token ha expirado');
			}
			throw new UnauthorizedException('Error al validar token');
		}
		console.log(authHeader);
	}
}
