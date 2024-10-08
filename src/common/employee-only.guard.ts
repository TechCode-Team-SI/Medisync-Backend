import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EmployeeOnlyGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userPayload = request.user as JwtPayloadType;
    const currentUser = await this.usersService.findById(userPayload.id, {
      withProfile: true,
    });

    if (!currentUser?.employeeProfile) return false;

    if (!currentUser.employeeProfile.status) return false;

    return true;
  }
}
