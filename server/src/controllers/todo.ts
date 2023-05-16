import { Request, Response } from 'express';
import { TodoModel } from '../models/todo';

export const getAllTodo = async (req: Request, res: Response) => {
  try {
    const todo = await TodoModel.find();
    res.status(200).json(todo);
  } catch (error) {
    console.log('error');
    res.status(500).json({ error: 'Unable to get todos' });
  }
};

export const insertTodo = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const todo = await TodoModel.create({ title, description });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create todo' });
  }
};

export const editTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const todo = await TodoModel.findById(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.status = status !== undefined ? status : todo.status;

    const updatedTodo = await todo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to update todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete todo' });
  }
};
