import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context
			.switchToHttp()
			.getRequest<{ headers: { authorization?: string } }>();

		// Aquí irá tu lógica de verificación de token en el futuro
		const authHeader = request.headers.authorization;
		if (!authHeader) {
			throw new UnauthorizedException(
				'No se proporcionó token de autorización',
			);
		}

		return true; // Retorna true para permitir el acceso por ahora
	}
}
