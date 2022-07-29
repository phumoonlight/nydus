import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LinkReqBody } from './link.type';
import { Link, LinkDocument } from './link.schema';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name)
    private linkModel: Model<LinkDocument>
  ) {}

  async getList(userId: string) {
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
    const result = await this.linkModel.updateOne(
      {
        _id: id,
        uid: userId,
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

  async delete(id: string, userId: string) {
    const result = await this.linkModel.deleteOne({
      _id: id,
      uid: userId,
    });
    return result;
  }
}
