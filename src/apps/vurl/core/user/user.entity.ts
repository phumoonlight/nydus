import {
  ModelDefinition,
  MongooseModule,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SCHEMA_TIMESTAMP_CONFIG } from '@/common/schema';
import { LoginType } from './user.type';

@Schema({
  timestamps: SCHEMA_TIMESTAMP_CONFIG,
  collection: 'users',
})
export class User {
  @Prop({ index: true, unique: true, required: true })
  uname: string;

  @Prop({ index: true, required: true })
  dname: string;

  @Prop({ required: true })
  pimg: string;

  @Prop({ default: LoginType.Guest })
  auth_type: LoginType;
}

export type UserDocument = User & Document;

export const userSchema = SchemaFactory.createForClass(User);

export const userModelDefinition: ModelDefinition = {
  name: User.name,
  schema: userSchema,
};

export const userEntityModule = MongooseModule.forFeature([
  userModelDefinition,
]);
