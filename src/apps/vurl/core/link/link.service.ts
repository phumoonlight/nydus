import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LinkDto } from './link.dto';
import { Link, LinkDocument } from './link.schema';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name)
    private linkModel: Model<LinkDocument>
  ) {}

  async getList(uid: string) {
    const links = await this.linkModel.find({ uid });
    return links;
  }

  async create(uid: string, dto: LinkDto) {
    const result = await this.linkModel.create({
      uid: uid,
      gid: dto.gid,
      name: dto.name,
      url: dto.url,
      timg: dto.timg,
      order: dto.order,
    });
    return result;
  }

  async update(id: string, uid: string, dto: any) {
    return '';
  }

  async delete(id: string, uid: string) {
    return '';
  }
}
