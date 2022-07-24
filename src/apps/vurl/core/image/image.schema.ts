import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SCHEMA_TIMESTAMP_CONFIG } from '@/common/schema';

@Schema({
  timestamps: SCHEMA_TIMESTAMP_CONFIG,
  collection: 'images',
})
export class UploadedImage {
  @Prop({ index: true, default: '' })
  uid: string;

  @Prop({ default: '' })
  url: string;

  @Prop({ default: '' })
  path: string;
}

export type UploadedImageDocument = UploadedImage & Document;
export const UploadedImageSchema = SchemaFactory.createForClass(UploadedImage);
export const UploadedImageModelDefinition: ModelDefinition = {
  name: UploadedImage.name,
  schema: UploadedImageSchema,
};
