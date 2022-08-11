import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto, UpdateLinkDto } from './link.type';
import { Auth } from '../../vurl.auth';

@Controller()
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get()
  async getList(@Auth() userId: string, @Query('group') groupId: string) {
    const value = await this.linkService.getList(userId, groupId);
    return {
      value,
    };
  }

  @Post()
  async create(@Auth() userId: string, @Body() body: CreateLinkDto) {
    const result = await this.linkService.create(userId, body);
    return result;
  }

  @Patch(':id')
  async updateLink(
    @Auth() userId: string,
    @Param('id') id: string,
    @Body() body: UpdateLinkDto
  ) {
    const result = await this.linkService.update(userId, id, body);
    return result;
  }

  @Delete(':id')
  async deleteLink(@Auth() userId: string, @Param('id') id: string) {
    await this.linkService.delete(userId, id);
  }
}
