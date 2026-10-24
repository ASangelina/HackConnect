import { AgentService } from './agent.service';
import { ChatDto } from './dto/chat.dto';
export declare class AgentController {
    private readonly agentService;
    constructor(agentService: AgentService);
    chat(dto: ChatDto): Promise<{
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
