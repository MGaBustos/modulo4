import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../common/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context
			.switchToHttp()
			.getRequest<{ user?: { roles?: string } }>();
		const userRoles = request.user?.roles;

		const routeRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
			'roles',
			[context.getHandler(), context.getClass()],
		);

		const isAllowed = routeRoles.some((role) => userRoles?.includes(role));
		if (!isAllowed) {
			throw new ForbiddenException(
				'Este usuario tiene permiso para acceder',
			);
		}
		return true;
	}
}
