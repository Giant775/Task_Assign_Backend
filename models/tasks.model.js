import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['todo', 'inProgress', 'completed'],
      default: 'todo',
    },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    dueDate: { type: Date },
    labels: [{ type: String }],
    comments: [
      {
        text: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model('Task', TaskSchema);
