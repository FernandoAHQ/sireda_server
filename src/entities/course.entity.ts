import { Schema, model, connect, ObjectId } from 'mongoose';

interface ICourse {
  title: string;
  objective?: string;
  place?: string;
  hours?: number;
  instructor?: string;
  target?: string;
  period?: string;
  prerequisites?: string;
  users: ObjectId[]

}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  objective: String,
  place: String,
  hours: Number,
  target: String,
  instructor: String,
  period: String,
  prerequisites: String,
  users: {
    type: [{
      user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }
  }]
  }
});

export const Course = model<ICourse>('Course', courseSchema);
