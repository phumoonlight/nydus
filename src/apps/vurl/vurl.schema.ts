import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Link {
  @Prop({ index: true })
  uid: string;

  @Prop({ index: true })
  gid: string;

  @Prop({ index: true })
  name: string;

  @Prop()
  timg: string;

  @Prop()
  url: string;

  @Prop()
  order: number;
}

export type LinkDocument = Link & Document;
export const LinkSchema = SchemaFactory.createForClass(Link);

@Schema({
  timestamps: true,
})
export class LinkGroup {
  @Prop({ index: true })
  uid: string;

  @Prop({ index: true })
  name: string;

  @Prop()
  desc: string;

  @Prop()
  timg: string;

  @Prop()
  order: number;
}

export type LinkGroupDocument = LinkGroup & Document;
export const LinkGroupSchema = SchemaFactory.createForClass(LinkGroup);
