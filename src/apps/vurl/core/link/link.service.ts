import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ownership } from '@/apps/vurl/common/ownership/ownership.type';
import { LinkReqBody } from './link.type';
import { Link, LinkDocument } from './link.schema';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name)
    private linkModel: Model<LinkDocument>
  ) {}

  async getList(ownership: Ownership) {
    const links = await this.linkModel.find({ uid: ownership.userId });
    return links;
  }

  async create(uid: string, payload: LinkReqBody) {
    const result = await this.linkModel.create({
      uid: uid,
      gid: payload.gid,
      name: payload.name,
      url: payload.url,
      timg: payload.timg,
      posn: payload.posn,
    });
    return result;
  }

  async update(ownership: Ownership, payload: LinkReqBody) {
    const result = await this.linkModel.updateOne(
      {
        _id: ownership.itemId,
        uid: ownership.userId,
      },
      {
        gid: payload.gid,
        name: payload.name,
        url: payload.url,
        timg: payload.timg,
        posn: payload.posn,
      }
    );
    return result;
  }

  async delete(ownership: Ownership) {
    const result = await this.linkModel.deleteOne({
      _id: ownership.itemId,
      uid: ownership.userId,
    });
    return result;
  }
}
