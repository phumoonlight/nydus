import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LinkService } from '../link/link.service';
import { LinkGroup, LinkGroupDocument } from './linkgroup.schema';
import { CreateLinkGroupDto, UpdateLinkGroupDto } from './linkgroup.type';

@Injectable()
export class LinkGroupService {
  constructor(
    @InjectModel(LinkGroup.name)
    private linkGroupModel: Model<LinkGroupDocument>,
    private linkService: LinkService
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
    const result = await this.linkGroupModel.create({
      uid: userId,
      name: dto.name,
      desc: dto.desc,
      timg: dto.timg,
      posn: dto.posn,
      is_pub: dto.public,
    });
    return result;
  }

  async update(userId: string, id: string, dto: UpdateLinkGroupDto) {
    const result = await this.linkGroupModel.updateOne(
      {
        _id: id,
        uid: userId,
      },
      {
        name: dto.name,
        desc: dto.desc,
        timg: dto.timg,
        posn: dto.posn,
        is_pub: dto.public,
      }
    );
    return result;
  }

  async delete(userId: string, id: string) {
    await this.linkService.ungroup(userId, id);
    const result = await this.linkGroupModel.deleteOne({
      _id: id,
      uid: userId,
    });
    return result;
  }
}
