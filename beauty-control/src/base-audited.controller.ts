import { GenericController } from "./generic.controller";
import { BaseAudited } from "./models/base-audited.model";
import { BaseAuditedService } from "./base-audited.service";
import { Post, UseGuards, Body, Put, Param, HttpException, HttpStatus, Req, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "./auth-strategies/jwt-strategy.guard";

export class BaseAuditedController<T extends BaseAudited> extends GenericController<T> {

    constructor(private baseService: BaseAuditedService<T>) {
        super(baseService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createBaseAudited(@Body() entity: T, @Req() req): Promise<T> {
        return await this.baseService.create(entity, req.user);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateBaseAudited(@Param('id') id: number, @Body() entity: T, @Req() req): Promise<T> {
        if (id != (entity as any).id) throw new HttpException('id param !== entity.id', HttpStatus.BAD_REQUEST);
        return await this.baseService.update(entity, req.user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async softDelete(@Param('id') id: number, @Req() req): Promise<void> {
        await this.baseService.softDelete(id, req.user);
    }
}