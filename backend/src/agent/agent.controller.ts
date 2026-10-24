import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AgentService } from './agent.service';
import { ChatDto } from './dto/chat.dto';

@ApiTags('Agent')
@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('chat')
  @ApiOperation({
    summary: 'Consultar o agente inteligente do HackConnect',
  })
  chat(@Body() dto: ChatDto) {
    return this.agentService.chat(dto.message);
  }
}
