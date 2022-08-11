import { ErrAccessDenied, ErrRecordNotFound } from '@/common/error';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Link, LinkDocument } from '../link/link.schema';
import { LinkGroup, LinkGroupDocument } from './linkgroup.schema';
import { CreateLinkGroupDto, UpdateLinkGroupDto } from './linkgroup.type';

@Injectable()
export class LinkGroupService {
  constructor(
    @InjectConnection()
    private connection: Connection,
    @InjectModel(LinkGroup.name)
    private linkGroupModel: Model<LinkGroupDocument>,
    @InjectModel(Link.name)
    private linkModel: Model<LinkDocument>
  ) {}

  async getList(userId: string) {
    const docs = await this.linkGroupModel.find({ uid: userId });
    return docs;
  }

  async getPublicList() {
    const docs = await this.linkGroupModel.find({ is_pub: true });
    return docs;
  }

  async getById(userId: string, id: string) {
    const doc = await this.linkGroupModel.findById(id);
    if (doc && !doc.is_pub && doc.uid !== userId) throw new ErrAccessDenied();
    return doc;
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
    const group = await this.linkGroupModel.findById(id);
    if (!group) throw new ErrRecordNotFound();
    if (group.uid !== userId) throw new ErrAccessDenied();
    if (typeof dto.name !== 'undefined') group.name = dto.name;
    if (typeof dto.desc !== 'undefined') group.desc = dto.desc;
    if (typeof dto.timg !== 'undefined') group.timg = dto.timg;
    if (typeof dto.posn !== 'undefined') group.posn = dto.posn;
    if (typeof dto.public !== 'undefined') group.is_pub = dto.public;
    const result = await group.save();
    return result;
  }

  async delete(userId: string, id: string) {
    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      const group = await this.linkGroupModel
        .findById(id)
        .select('id uid')
        .session(session);
      if (!group) throw new ErrRecordNotFound();
      if (group.uid !== userId) throw new ErrAccessDenied();
      await this.linkModel.updateMany(
        { uid: userId, gid: id },
        { gid: '' },
        { session }
      );
      await group.remove();
    });
    await session.commitTransaction();
    await session.endSession();
  }
}
