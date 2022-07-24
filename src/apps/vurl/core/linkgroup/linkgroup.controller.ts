import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { LinkGroupService } from './linkgroup.service';

@Controller()
export class LinkGroupController {
  constructor(private linkGroupService: LinkGroupService) {}

  @Get()
  async getList() {
    const re = await this.linkGroupService.getList();
    return {
      value: re,
    };
  }

  @Post()
  async create() {
    const result = await this.linkGroupService.create();
    return result;
  }
}
