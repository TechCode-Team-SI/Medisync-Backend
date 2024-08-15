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
import { FieldQuestionsService } from './field-questions.service';
import { CreateFieldQuestionDto } from './dto/create-field-question.dto';
import { UpdateFieldQuestionDto } from './dto/update-field-question.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FieldQuestion } from './domain/field-question';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllFieldQuestionsDto } from './dto/find-all-field-questions.dto';
import { exceptionResponses } from 'src/field-questions/field-questions.messages';
import { getPagination } from 'src/utils/get-pagination';

@ApiTags('FieldQuestions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'field-questions',
  version: '1',
})
export class FieldQuestionsController {
  constructor(private readonly fieldQuestionsService: FieldQuestionsService) {}

  @Post()
  @ApiCreatedResponse({
    type: FieldQuestion,
  })
  create(@Body() createFieldQuestionDto: CreateFieldQuestionDto) {
    return this.fieldQuestionsService.create(createFieldQuestionDto);
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

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: FieldQuestion,
  })
  update(
    @Param('id') id: string,
    @Body() updateFieldQuestionDto: UpdateFieldQuestionDto,
  ) {
    return this.fieldQuestionsService.update(id, updateFieldQuestionDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.fieldQuestionsService.remove(id);
  }
}
