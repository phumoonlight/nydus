import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { Authorization } from '../../vurl.auth';
import { Link } from './link.schema';
import { LinkDto } from './link.dto';

@Controller()
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get()
  async getList(@Authorization() userId: string) {
    const value = await this.linkService.getList(userId);
    return {
      value,
    };
  }

  @Post()
  async create(@Authorization() userId: string, @Body() payload: LinkDto) {
    const result = await this.linkService.create(userId, payload);
    return {
      message: 'success',
      value: result,
    };
  }

  @Patch('links/:id')
  async updateLink(
    @Authorization() userId: string,
    @Param('id') id: string,
    @Body() payload: Link
  ) {
    const result = await this.linkService.update(id, userId, payload);
    return {
      message: 'success',
      value: result,
    };
  }

  @Delete('links/:id')
  async deleteLink(@Authorization() userId: string, @Param('id') id: string) {
    await this.linkService.delete(id, userId);
    return {
      message: 'success',
    };
  }
}
