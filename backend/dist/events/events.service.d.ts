import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateEventDto): Promise<{
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
        id: number;
    }>;
    findAll(month?: number, year?: number): Promise<{
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
        id: number;
    }[]>;
    findOne(id: number): Promise<{
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
        id: number;
    }>;
    remove(id: number): Promise<{
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
        id: number;
    }>;
}
