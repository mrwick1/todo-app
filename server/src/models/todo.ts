import mongoose from 'mongoose';

type Todo = {
  title: String;
  description: String;
  status: boolean;
};

const TodoSchema = new mongoose.Schema<Todo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const TodoModel = mongoose.model('Todo', TodoSchema);
