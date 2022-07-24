import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { LinkService } from './link.service';
import { Authorization } from '../../vurl.auth';
import { LinkDocument } from './link.schema';

@Controller()
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get()
  async getList(@Authorization() userId: string) {
    const value = await this.linkService.getList();
    return {
      value,
    };
  }

  @Post()
  async create(@Body() link: LinkDocument) {
    const result = await this.linkService.create(link);
    return result;
  }

  // @Patch('links/:id')
  // async updateLink(link: LinkDocument) {
  //   return await this.linkModel.findByIdAndUpdate(link._id, link);
  // }

  // @Delete('links/:id')
  // async deleteLink(id: string) {
  //   return await this.linkModel.findByIdAndDelete(id);
  // }
}
