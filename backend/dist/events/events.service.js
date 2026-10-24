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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EventsService = class EventsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
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
    async findAll(month, year) {
        const where = {};
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
    async findOne(id) {
        const event = await this.prisma.event.findUnique({
            where: { id },
        });
        if (!event) {
            throw new common_1.NotFoundException('Evento não encontrado');
        }
        return event;
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.event.delete({
            where: { id },
        });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
//# sourceMappingURL=events.service.js.map