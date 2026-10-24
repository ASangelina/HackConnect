"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GemmaService = void 0;
const common_1 = require("@nestjs/common");
let GemmaService = class GemmaService {
    async chat(message) {
        const baseUrl = process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434';
        const model = process.env.OLLAMA_MODEL ?? 'gemma4:e2b';
        let response;
        try {
            response = await fetch(`${baseUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model,
                    stream: false,
                    messages: [
                        {
                            role: 'system',
                            content: 'Você é o assistente do HackConnect. ' +
                                'Responda sempre em português, de forma objetiva. ' +
                                'Não invente eventos nem afirme que realizou operações ' +
                                'que não foram executadas pelo backend.',
                        },
                        {
                            role: 'user',
                            content: message,
                        },
                    ],
                }),
                signal: AbortSignal.timeout(60000),
            });
        }
        catch {
            throw new common_1.ServiceUnavailableException('Não foi possível conectar ao Gemma 4 pelo Ollama.');
        }
        if (!response.ok) {
            throw new common_1.ServiceUnavailableException(`O Ollama retornou HTTP ${response.status}.`);
        }
        const result = await response.json();
        return result.message.content;
    }
};
exports.GemmaService = GemmaService;
exports.GemmaService = GemmaService = __decorate([
    (0, common_1.Injectable)()
], GemmaService);
//# sourceMappingURL=gemma.service.js.map