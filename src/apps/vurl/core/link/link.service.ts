import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrRecordNotFound } from '@/apps/vurl/common/error';
import { LinkReqBody } from './link.type';
import { Link, LinkDocument } from './link.schema';

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

  async create(userId: string, payload: LinkReqBody) {
    const result = await this.linkModel.create({
      uid: userId,
      gid: payload.gid,
      name: payload.name,
      url: payload.url,
      timg: payload.timg,
      posn: payload.posn,
    });
    return result;
  }

  async update(id: string, userId: string, payload: LinkReqBody) {
    const existLink = await this.linkModel.findOne({
      _id: id,
      uid: userId,
    });
    if (!existLink) throw new ErrRecordNotFound();
    if (typeof payload.gid !== 'undefined') existLink.gid = payload.gid;
    if (typeof payload.name !== 'undefined') existLink.name = payload.name;
    if (typeof payload.url !== 'undefined') existLink.url = payload.url;
    if (typeof payload.timg !== 'undefined') existLink.timg = payload.timg;
    if (typeof payload.posn !== 'undefined') existLink.posn = payload.posn;
    const result = await existLink.save();
    // const result = await this.linkModel.updateOne(
    //   {
    //     _id: id,
    //     uid: userId,
    //   },
    //   {
    //     gid: payload.gid,
    //     name: payload.name,
    //     url: payload.url,
    //     timg: payload.timg,
    //     posn: payload.posn,
    //   }
    // );
    return result;
  }

  async ungroup(userId: string, groupId: string) {
    const result = await this.linkModel.updateMany(
      { uid: userId, gid: groupId },
      { gid: '' }
    );
    return result;
  }

  async delete(id: string, userId: string) {
    const result = await this.linkModel.deleteOne({
      _id: id,
      uid: userId,
    });
    return result;
  }
}
