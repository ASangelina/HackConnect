import { Injectable } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { GemmaService } from './gemma.service';

@Injectable()
export class AgentService {
  constructor(
    private readonly gemma: GemmaService,
    private readonly events: EventsService,
  ) {}

  async chat(message: string) {
    // O modelo identifica a intenção do usuário.
    const interpretation = await this.gemma.chat(
      `Identifique a intenção da mensagem abaixo.

Retorne somente JSON válido, sem markdown, usando este formato:
{
  "intent": "search_events" | "create_event" | "other",
  "month": null,
  "year": null,
  "event": null
}

Para cadastro, event deve conter os dados informados pelo usuário.
Não invente dados ausentes.

Mensagem: ${message}`,
    );

    let result: any;

    try {
      result = JSON.parse(interpretation);
    } catch {
      return {
        intent: 'other',
        message: 'Não consegui interpretar a solicitação. Tente reformular.',
      };
    }

    if (result.intent === 'search_events') {
      const events = await this.events.findAll(
        result.month ?? undefined,
        result.year ?? undefined,
      );

      return {
        intent: 'search_events',
        message: events.length
          ? `Encontrei ${events.length} evento(s) cadastrado(s).`
          : 'Não encontrei eventos para os filtros informados.',
        data: events,
      };
    }

    if (result.intent === 'create_event') {
      return {
        intent: 'create_event',
        message:
          'Identifiquei um pedido de cadastro. Revise os dados e confirme antes de salvar.',
        proposedEvent: result.event,
        requiresConfirmation: true,
      };
    }

    return {
      intent: 'other',
      message: await this.gemma.chat(message),
    };
  }
}
