import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly rolesService: RolesService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getClass(), context.getHandler()],
    );
    if (!permissions.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const jwtPayload = request.user as JwtPayloadType;
    const roles = jwtPayload.roles;

    if (!roles) return false;

    const currentUserPermissions = roles.reduce<string[]>((acc, role) => {
      const permissions = role.permissions?.map((role) => role.slug) || [];
      const noDuplicatePermissions = [...new Set([...acc, ...permissions])];
      return noDuplicatePermissions;
    }, []);

    const hasAllPermissions = permissions.every((permission) =>
      currentUserPermissions.includes(permission),
    );

    return hasAllPermissions;
  }
}
