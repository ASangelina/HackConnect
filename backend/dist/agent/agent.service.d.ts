import { EventsService } from '../events/events.service';
import { GemmaService } from './gemma.service';
export declare class AgentService {
    private readonly gemma;
    private readonly events;
    constructor(gemma: GemmaService, events: EventsService);
    chat(message: string): Promise<{
        intent: string;
        message: string;
        data?: undefined;
        proposedEvent?: undefined;
        requiresConfirmation?: undefined;
    } | {
        intent: string;
        message: string;
        data: {
            id: number;
            name: string;
            description: string | null;
            category: string;
            startDate: Date | null;
            endDate: Date | null;
            city: string | null;
            country: string;
            format: string;
            url: string | null;
            createdAt: Date;
        }[];
        proposedEvent?: undefined;
        requiresConfirmation?: undefined;
    } | {
        intent: string;
        message: string;
        proposedEvent: any;
        requiresConfirmation: boolean;
        data?: undefined;
    }>;
}
