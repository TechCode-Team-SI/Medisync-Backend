import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { exceptionResponses } from 'src/field-questions/field-questions.messages';
import { getPagination } from 'src/utils/get-pagination';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FieldQuestion } from './domain/field-question';
import { CreateSelectionFieldQuestionDto } from './dto/create-selection-field-question.dto';
import { CreateTextfieldFieldQuestionDto } from './dto/create-textfield-field-question.dto';
import { FindAllFieldQuestionsDto } from './dto/find-all-field-questions.dto';
import { FieldQuestionsService } from './field-questions.service';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsEnum } from 'src/permissions/permissions.enum';

@ApiTags('FieldQuestions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'field-questions',
  version: '1',
})
export class FieldQuestionsController {
  constructor(private readonly fieldQuestionsService: FieldQuestionsService) {}

  @Post('selection')
  @Permissions(PermissionsEnum.MANAGE_QUESTIONS)
  @UseGuards(PermissionsGuard)
  @ApiCreatedResponse({
    type: FieldQuestion,
  })
  createSelection(
    @Body() createFieldQuestionDto: CreateSelectionFieldQuestionDto,
  ) {
    return this.fieldQuestionsService.createSelection(createFieldQuestionDto);
  }

  @Post('textfield')
  @Permissions(PermissionsEnum.MANAGE_QUESTIONS)
  @UseGuards(PermissionsGuard)
  @ApiCreatedResponse({
    type: FieldQuestion,
  })
  createTextField(
    @Body() createFieldQuestionDto: CreateTextfieldFieldQuestionDto,
  ) {
    return this.fieldQuestionsService.createTextField(createFieldQuestionDto);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(FieldQuestion),
  })
  async findAll(
    @Query() query: FindAllFieldQuestionsDto,
  ): Promise<PaginationResponseDto<FieldQuestion>> {
    const paginationOptions = getPagination(query);

    return this.fieldQuestionsService.findAllWithPagination({
      paginationOptions,
      filterOptions: query?.filters,
      sortOptions: query?.sort,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: FieldQuestion,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.fieldQuestionsService.findOne(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return entity;
  }

  @Delete(':id')
  @Permissions(PermissionsEnum.MANAGE_QUESTIONS)
  @UseGuards(PermissionsGuard)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.fieldQuestionsService.remove(id);
  }
}
