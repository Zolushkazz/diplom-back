// auth/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // Ямар ч role шаардлага байхгүй бол зөвшөөрнө
    }

    const { user } = context.switchToHttp().getRequest();

    console.log('useascascar', user);

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Танд энэ үйлдлийг хийх эрх байхгүй байна!');
    }

    return true;
  }
}
