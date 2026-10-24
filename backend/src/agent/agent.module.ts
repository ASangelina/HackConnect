import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { GemmaService } from './gemma.service';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [EventsModule],
  controllers: [AgentController],
  providers: [AgentService, GemmaService],
})
export class AgentModule {}
