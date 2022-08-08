import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  MONGO_SCHEMA_TO_JSON_OPTIONS,
  MONGO_SCHEMA_TIMESTAMP_CONFIG,
} from '@/apps/vurl/vurl.config';

@Schema({
  collection: 'link_items',
  optimisticConcurrency: true,
  timestamps: MONGO_SCHEMA_TIMESTAMP_CONFIG,
  toJSON: MONGO_SCHEMA_TO_JSON_OPTIONS,
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
  posn: number;
}

export type LinkDocument = Link & Document;
export const LinkSchema = SchemaFactory.createForClass(Link);
export const LinkModelDefinition: ModelDefinition = {
  name: Link.name,
  schema: LinkSchema,
};
