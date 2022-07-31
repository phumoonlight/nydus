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
import { LinkReqBody } from './link.type';

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
  async create(@Authorization() userId: string, @Body() body: LinkReqBody) {
    const result = await this.linkService.create(userId, body);
    return {
      result,
    };
  }

  @Patch(':id')
  async updateLink(
    @Authorization() userId: string,
    @Param('id') id: string,
    @Body() payload: Link
  ) {
    const result = await this.linkService.update(id, userId, payload);
    return {
      result,
    };
  }

  @Delete(':id')
  async deleteLink(@Authorization() userId: string, @Param('id') id: string) {
    const result = this.linkService.delete(id, userId);
    return {
      result,
    };
  }
}
