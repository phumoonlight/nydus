import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { vurlFirebase } from './vurl.firebase';
import {
  Link,
  LinkDocument,
  LinkGroup,
  LinkGroupDocument,
} from './vurl.schema';
import { VurlService } from './vurl.service';

@Controller('api/vurl')
export class VurlController {
  constructor(
    @InjectModel(Link.name)
    private linkModel: Model<LinkDocument>,
    @InjectModel(LinkGroup.name)
    private linkGroupModel: Model<LinkGroupDocument>,
    private vurlService: VurlService
  ) {}

  @Get('links')
  async getLinks() {
    const value = await this.vurlService.getLinks();
    return {
      name: vurlFirebase.bucket.name,
      value,
    };
  }

  @Post('links')
  async createLink(link: LinkDocument) {
    const newLink = new this.linkModel(link);
    return await newLink.save();
  }

  @Patch('links/:id')
  async updateLink(link: LinkDocument) {
    return await this.linkModel.findByIdAndUpdate(link._id, link);
  }

  @Delete('links/:id')
  async deleteLink(id: string) {
    return await this.linkModel.findByIdAndDelete(id);
  }

  @Get('linkgroups')
  async getLinkGroups() {
    const re = await this.linkGroupModel.find();
    return {
      value: re,
    };
  }

  @Post('linkgroups')
  async createLinkGroup(group: LinkGroupDocument) {
    const newGroup = new this.linkGroupModel(group);
    return await newGroup.save();
  }
}
