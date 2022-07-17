import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Link,
  LinkDocument,
  LinkGroup,
  LinkGroupDocument,
} from './vurl.schema';

@Injectable()
export class VurlService {
  constructor(
    @InjectModel(Link.name)
    private linkModel: Model<LinkDocument>,
    @InjectModel(LinkGroup.name)
    private linkGroupModel: Model<LinkGroupDocument>
  ) {}

  async getLinks() {
    const result = await this.linkModel.find();
    return result;
  }
}
