import { Schema, model, connect } from 'mongoose';

interface IUser {
  name?: string;
  lastName?: string;
  username: string;
  department: string;
  isOnline?: boolean;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  name: String,
  lastName: String,
  department: String,
  isOnline: { type: Boolean, default: false },
});

export const User = model<IUser>('User', userSchema);
