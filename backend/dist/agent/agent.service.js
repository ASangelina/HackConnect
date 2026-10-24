"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentService = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("../events/events.service");
const gemma_service_1 = require("./gemma.service");
let AgentService = class AgentService {
    gemma;
    events;
    constructor(gemma, events) {
        this.gemma = gemma;
        this.events = events;
    }
    async chat(message) {
        const interpretation = await this.gemma.chat(`Identifique a intenção da mensagem abaixo.

Retorne somente JSON válido, sem markdown, usando este formato:
{
  "intent": "search_events" | "create_event" | "other",
  "month": null,
  "year": null,
  "event": null
}

Para cadastro, event deve conter os dados informados pelo usuário.
Não invente dados ausentes.

Mensagem: ${message}`);
        let result;
        try {
            result = JSON.parse(interpretation);
        }
        catch {
            return {
                intent: 'other',
                message: 'Não consegui interpretar a solicitação. Tente reformular.',
            };
        }
        if (result.intent === 'search_events') {
            const events = await this.events.findAll(result.month ?? undefined, result.year ?? undefined);
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
                message: 'Identifiquei um pedido de cadastro. Revise os dados e confirme antes de salvar.',
                proposedEvent: result.event,
                requiresConfirmation: true,
            };
        }
        return {
            intent: 'other',
            message: await this.gemma.chat(message),
        };
    }
};
exports.AgentService = AgentService;
exports.AgentService = AgentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gemma_service_1.GemmaService,
        events_service_1.EventsService])
], AgentService);
//# sourceMappingURL=agent.service.js.map