import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar evento' })
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar eventos por período' })
  findAll(
    @Query('month') month?: string,
    @Query('year') year?: string,
  ) {
    return this.eventsService.findAll(
      month ? Number(month) : undefined,
      year ? Number(year) : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar evento por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir evento por ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.remove(id);
  }
}
