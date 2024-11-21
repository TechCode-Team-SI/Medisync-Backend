import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Me } from 'src/auth/auth.decorator';
import { SuccessResponseDto } from 'src/auth/dto/success-response.dto';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { getPagination } from 'src/utils/get-pagination';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { Notification } from './domain/notification';
import { FindAllNotificationsDto } from './dto/find-all-notifications.dto';
import { ReadNotificationsDto } from './dto/read-notifications.dto';
import { NotificationsService } from './notifications.service';
import { NotificationMapper } from './infrastructure/persistence/relational/mappers/notification.mapper';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'notifications',
  version: '1',
})
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('me')
  @ApiOkResponse({
    type: PaginationResponse(Notification),
  })
  async findAllMine(
    @Query() query: FindAllNotificationsDto,
    @Me() userPayload: JwtPayloadType,
  ): Promise<PaginationResponseDto<Notification>> {
    const paginationOptions = getPagination(query);

    const result = await this.notificationsService.findAllWithPagination({
      paginationOptions,
      sortOptions: query.sort,
      filterOptions: {
        userId: userPayload.id,
        read: query.filters?.read,
        type: query.filters?.type,
      },
    });

    return {
      ...result,
      data: result.data.map((notification) =>
        NotificationMapper.flattenNotificationPerUser(notification),
      ),
    };
  }

  @Post('me/read-all')
  @ApiOkResponse({
    type: SuccessResponseDto,
  })
  readAll(@Me() userPayload: JwtPayloadType) {
    return this.notificationsService.readAll(userPayload.id);
  }

  @Post('me/read')
  @ApiOkResponse({
    type: SuccessResponseDto,
  })
  read(
    @Body() readNotifications: ReadNotificationsDto,
    @Me() userPayload: JwtPayloadType,
  ) {
    return this.notificationsService.readMany(
      userPayload.id,
      readNotifications.notificationUserIds,
    );
  }
}
