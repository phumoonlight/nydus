import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrAccessDenied, ErrRecordNotFound } from '@/common/error';
import { Link, LinkDocument } from './link.schema';
import { CreateLinkDto, UpdateLinkDto } from './link.type';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name)
    private linkModel: Model<LinkDocument>
  ) {}

  async getList(userId: string, groupId = '') {
    if (groupId) {
      const result = await this.linkModel.find({
        uid: userId,
        gid: groupId,
      });
      return result;
    }
    const result = await this.linkModel.find({ uid: userId });
    return result;
  }

  async create(userId: string, dto: CreateLinkDto) {
    const result = await this.linkModel.create({
      uid: userId,
      gid: dto.gid,
      name: dto.name,
      url: dto.url,
      timg: dto.timg,
      posn: dto.posn,
    });
    return result;
  }

  async update(userId: string, id: string, dto: UpdateLinkDto) {
    const doc = await this.linkModel.findById(id);
    if (!doc) throw new ErrRecordNotFound();
    if (doc.uid !== userId) throw new ErrAccessDenied();
    if (typeof dto.gid !== 'undefined') doc.gid = dto.gid;
    if (typeof dto.name !== 'undefined') doc.name = dto.name;
    if (typeof dto.url !== 'undefined') doc.url = dto.url;
    if (typeof dto.timg !== 'undefined') doc.timg = dto.timg;
    if (typeof dto.posn !== 'undefined') doc.posn = dto.posn;
    const result = await doc.save();
    return result;
  }

  async delete(userId: string, id: string) {
    const doc = await this.linkModel.findById(id);
    if (!doc) throw new ErrRecordNotFound();
    if (doc.uid !== userId) throw new ErrAccessDenied();
    await doc.remove();
  }
}
