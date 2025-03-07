import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PayloadDto } from '../global-dto/payload.dto';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/required-roles.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
    const request = context.switchToHttp().getRequest();
    const user: PayloadDto = request.user;
    const requiredRoles = this.reflector.getAllAndOverride<number[]>(
      ROLES_KEY,
      [context.getClass(), context.getHandler()],
    );
    if (!requiredRoles) {
      return true;
    }
    return user.roles.some((role) => requiredRoles.includes(role.id));
  }
}
