import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { RequestSavedDataService } from './request-saved-data.service';

@ApiTags('Requestsaveddata')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'request-saved-data',
  version: '1',
})
export class RequestSavedDataController {
  constructor(
    private readonly requestSavedDataService: RequestSavedDataService,
  ) {}

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.requestSavedDataService.remove(id);
  }
}
