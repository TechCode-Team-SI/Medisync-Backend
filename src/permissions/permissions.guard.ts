import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly rolesService: RolesService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.getAllAndOverride<(number | string)[]>(
      'permissions',
      [context.getClass(), context.getHandler()],
    );
    if (!permissions.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const roles = request.user?.roles;

    if (!roles || roles.length === 0) return true;

    //TODO: Finish permissions guard

    return permissions.map(String).includes(String(request.user?.role?.id));
  }
}
