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
import { OwnershipService } from '../../common/ownership/ownership.service';

@Controller()
export class LinkController {
  constructor(
    private linkService: LinkService,
    private ownershipService: OwnershipService
  ) {}

  @Get()
  async getList(@Authorization() userId: string) {
    const ownership = this.ownershipService.create(userId, '');
    const value = await this.linkService.getList(ownership);
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

  @Patch('links/:id')
  async updateLink(
    @Authorization() userId: string,
    @Param('id') id: string,
    @Body() payload: Link
  ) {
    const ownership = this.ownershipService.create(userId, id);
    const result = await this.linkService.update(ownership, payload);
    return {
      result,
    };
  }

  @Delete('links/:id')
  async deleteLink(@Authorization() userId: string, @Param('id') id: string) {
    const ownership = this.ownershipService.create(userId, id);
    const result = this.linkService.delete(ownership);
    return {
      result,
    };
  }
}
