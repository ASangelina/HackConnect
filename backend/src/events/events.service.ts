import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        name: dto.name,
        description: dto.description,
        category: dto.category,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        city: dto.city,
        country: dto.country ?? 'Brasil',
        format: dto.format ?? 'online',
        url: dto.url,
      },
    });
  }

  async findAll(month?: number, year?: number) {
    const where: any = {};

    if (month && year) {
      where.startDate = {
        gte: new Date(Date.UTC(year, month - 1, 1)),
        lt: new Date(Date.UTC(year, month, 1)),
      };
    }

    return this.prisma.event.findMany({
      where,
      orderBy: { startDate: 'asc' },
    });
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    return event;
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.event.delete({
      where: { id },
    });
  }
}
