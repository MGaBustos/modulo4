//* 1- Guest Sin token ni rol (Sin AuthGuard)
//* 2- User Con token, sin rol(AuthGuard)
//* 3Admin con token, con rol (AuthGuard, RoleGuard)

import { SetMetadata } from '@nestjs/common';
import { Role } from '../common/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
