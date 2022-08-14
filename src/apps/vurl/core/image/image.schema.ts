import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  MONGO_SCHEMA_TO_JSON_OPTIONS,
  MONGO_SCHEMA_TIMESTAMP_CONFIG,
} from '@/apps/vurl/vurl.config';

@Schema({
  collection: 'images',
  optimisticConcurrency: true,
  timestamps: MONGO_SCHEMA_TIMESTAMP_CONFIG,
  toJSON: MONGO_SCHEMA_TO_JSON_OPTIONS,
})
export class UploadedImage {
  @Prop({ index: true, default: '' })
  uid: string;

  @Prop({ default: '' })
  url: string;

  @Prop({ default: '' })
  fname: string;
}

export type UploadedImageDocument = UploadedImage & Document;
export const UploadedImageSchema = SchemaFactory.createForClass(UploadedImage);
export const UploadedImageModelDefinition: ModelDefinition = {
  name: UploadedImage.name,
  schema: UploadedImageSchema,
};
