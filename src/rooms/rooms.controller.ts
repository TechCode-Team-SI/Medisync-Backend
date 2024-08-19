import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Room } from './domain/room';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllRoomsDto } from './dto/find-all-rooms.dto';
import { exceptionResponses } from 'src/rooms/rooms.messages';
import { getPagination } from 'src/utils/get-pagination';

@ApiTags('Rooms')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'rooms',
  version: '1',
})
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Room,
  })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(Room),
  })
  async findAll(
    @Query() query: FindAllRoomsDto,
  ): Promise<PaginationResponseDto<Room>> {
    const paginationOptions = getPagination(query);

    return this.roomsService.findAllWithPagination({
      paginationOptions,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Room,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.roomsService.findOne(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return entity;
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Room,
  })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
