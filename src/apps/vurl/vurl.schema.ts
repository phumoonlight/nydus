import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'link_items',
})
export class Link {
  @Prop({ index: true, required: true })
  uid: string;

  @Prop({ index: true, default: '', ref: 'link_groups' })
  gid: string;

  @Prop({ index: true, required: true })
  name: string;

  @Prop({ default: '' })
  timg: string;

  @Prop({ default: '' })
  url: string;

  @Prop({ default: 0 })
  order: number;
}

export type LinkDocument = Link & Document;
export const LinkSchema = SchemaFactory.createForClass(Link);

@Schema({
  timestamps: true,
  collection: 'link_groups',
})
export class LinkGroup {
  @Prop({ index: true, required: true })
  uid: string;

  @Prop({ index: true, required: true })
  name: string;

  @Prop({ default: '' })
  desc: string;

  @Prop({ default: '' })
  timg: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: false })
  ispub: boolean;
}

export type LinkGroupDocument = LinkGroup & Document;
export const LinkGroupSchema = SchemaFactory.createForClass(LinkGroup);

@Schema({
  timestamps: true,
  collection: 'images',
})
export class UploadedImage {
  @Prop({ index: true, default: '' })
  uid: string;

  @Prop({ default: '' })
  url: string;
}

export type UploadedImageDocument = UploadedImage & Document;
export const UploadedImageSchema = SchemaFactory.createForClass(UploadedImage);
