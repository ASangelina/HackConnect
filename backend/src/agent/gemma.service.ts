import {
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class GemmaService {
  async chat(message: string): Promise<string> {
    const baseUrl =
      process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434';

    const model =
      process.env.OLLAMA_MODEL ?? 'gemma4:e2b';

    let response: Response;

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
              content:
                'Você é o assistente do HackConnect. ' +
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
    } catch {
      throw new ServiceUnavailableException(
        'Não foi possível conectar ao Gemma 4 pelo Ollama.',
      );
    }

    if (!response.ok) {
      throw new ServiceUnavailableException(
        `O Ollama retornou HTTP ${response.status}.`,
      );
    }

    const result = await response.json();

    return result.message.content;
  }
}
