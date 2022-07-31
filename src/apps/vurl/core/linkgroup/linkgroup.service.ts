import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LinkGroup, LinkGroupDocument } from './linkgroup.schema';
import { CreateLinkGroupDto } from './linkgroup.type';

@Injectable()
export class LinkGroupService {
  constructor(
    @InjectModel(LinkGroup.name)
    private linkGroupModel: Model<LinkGroupDocument>
  ) {}

  async getList(userId: string) {
    const result = await this.linkGroupModel.find({ uid: userId });
    return result;
  }

  async getById(userId: string, id: string) {
    const result = await this.linkGroupModel.findOne({ _id: id, uid: userId });
    return result;
  }

  async create(userId: string, dto: CreateLinkGroupDto) {
    return '';
  }

  async update(userId: string, id: string, dto: CreateLinkGroupDto) {
    return '';
  }

  async delete(userId: string, id: string) {
    return '';
  }
}
