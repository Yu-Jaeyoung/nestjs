import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
