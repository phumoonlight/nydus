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
import { Auth } from '../../vurl.auth';
import { LinkGroupService } from './linkgroup.service';
import { CreateLinkGroupDto, UpdateLinkGroupDto } from './linkgroup.type';

@Controller()
export class LinkGroupController {
  constructor(private linkGroupService: LinkGroupService) {}

  @Get()
  async getList(@Auth() userId: string, @Query('type') type: string) {
    const body = {
      value: [],
    };
    if (type === 'public') {
      body.value = await this.linkGroupService.getPublicList();
    } else {
      body.value = await this.linkGroupService.getList(userId);
    }
    return body;
  }

  @Post()
  async create(@Auth() userId: string, @Body() dto: CreateLinkGroupDto) {
    const result = await this.linkGroupService.create(userId, dto);
    return result;
  }

  @Patch(':id')
  async update(
    @Auth() userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateLinkGroupDto
  ) {
    const result = await this.linkGroupService.update(userId, id, dto);
    return result;
  }

  @Delete(':id')
  async delete(@Auth() userId: string, @Param('id') id: string) {
    await this.linkGroupService.delete(userId, id);
  }
}
