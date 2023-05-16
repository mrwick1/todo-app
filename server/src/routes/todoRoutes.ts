import express from 'express';
import {
  deleteTodo,
  editTodo,
  getAllTodo,
  insertTodo,
} from '../controllers/todo';

const router = express.Router();

router.get('/todo', getAllTodo);
router.post('/todo', insertTodo);
router.put('/todo/:id', editTodo);
router.delete('/todo/:id', deleteTodo);
export default router;
