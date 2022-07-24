import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SCHEMA_TIMESTAMP_CONFIG } from '@/common/schema';

@Schema({
  timestamps: SCHEMA_TIMESTAMP_CONFIG,
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
export const LinkModelDefinition: ModelDefinition = {
  name: Link.name,
  schema: LinkSchema,
};
