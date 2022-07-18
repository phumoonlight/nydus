import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Link, LinkDocument } from './schemas/link.schema';

@Injectable()
export class VurlService {
  constructor(
    @InjectModel(Link.name)
    private linkModel: Model<LinkDocument>
  ) {}

  async getLinks() {
    const result = await this.linkModel.find();
    return result;
  }
}
