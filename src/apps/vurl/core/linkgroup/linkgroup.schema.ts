import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  MONGO_SCHEMA_TO_JSON_OPTIONS,
  MONGO_SCHEMA_TIMESTAMP_CONFIG,
} from '@/apps/vurl/vurl.config';

@Schema({
  collection: 'link_groups',
  optimisticConcurrency: true,
  timestamps: MONGO_SCHEMA_TIMESTAMP_CONFIG,
  toJSON: MONGO_SCHEMA_TO_JSON_OPTIONS,
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
  posn: number;

  @Prop({ default: false })
  is_pub: boolean;
}

export type LinkGroupDocument = LinkGroup & Document;
export const LinkGroupSchema = SchemaFactory.createForClass(LinkGroup);
export const LinkGroupModelDefinition: ModelDefinition = {
  name: LinkGroup.name,
  schema: LinkGroupSchema,
};
