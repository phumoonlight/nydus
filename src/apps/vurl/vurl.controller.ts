import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { vurlFirebase } from './vurl.firebase';
import { VurlService } from './vurl.service';
import { Link, LinkDocument } from './schemas/link.schema';
import { LinkGroup, LinkGroupDocument } from './schemas/linkgroup.schema';
import { ImageService } from './services/image.service';

@Controller('api/vurl')
export class VurlController {
  constructor(
    @InjectModel(Link.name)
    private linkModel: Model<LinkDocument>,
    @InjectModel(LinkGroup.name)
    private linkGroupModel: Model<LinkGroupDocument>,
    private vurlService: VurlService,
    private imageService: ImageService
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

  @Post('images')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const uploadedUrl = await this.imageService.upload('', file);
    if (!uploadedUrl) {
      throw new HttpException(
        'Upload failed',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return {
      message: 'success',
      code: 'success',
      uploadedUrl: uploadedUrl,
    };
  }
}
