import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Authorization } from '../../vurl.auth';
import { LinkGroupService } from './linkgroup.service';
import { CreateLinkGroupDto, UpdateLinkGroupDto } from './linkgroup.type';

@Controller()
export class LinkGroupController {
  constructor(private linkGroupService: LinkGroupService) {}

  @Get()
  async getList(@Authorization() userId: string) {
    const value = await this.linkGroupService.getList(userId);
    return {
      value,
    };
  }

  @Post()
  async create(
    @Authorization() userId: string,
    @Body() dto: CreateLinkGroupDto
  ) {
    const result = await this.linkGroupService.create(userId, dto);
    return result;
  }

  @Patch(':id')
  async update(
    @Authorization() userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateLinkGroupDto
  ) {
    const result = await this.linkGroupService.update(userId, id, dto);
    return result;
  }

  @Delete(':id')
  async delete(@Authorization() userId: string, @Param('id') id: string) {
    const result = await this.linkGroupService.delete(userId, id);
    return result;
  }
}
