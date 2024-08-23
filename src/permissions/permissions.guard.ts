import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { PermissionsService } from './permissions.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly permissionsService: PermissionsService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getClass(), context.getHandler()],
    );
    if (!permissions.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const jwtPayload = request.user as JwtPayloadType;
    const currentUserPermissions =
      await this.permissionsService.findAllByRoleSlugs(jwtPayload.roleSlugs, {
        minimal: true,
      });
    const currentUserPermissionSlugs = currentUserPermissions.map(
      (permission) => permission.slug,
    );

    if (permissions.length === 0) return false;

    const hasAllPermissions = permissions.every((permission) =>
      currentUserPermissionSlugs.includes(permission),
    );

    return hasAllPermissions;
  }
}
