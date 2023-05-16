import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Container,
  Modal,
  Form,
  ListGroup,
} from 'react-bootstrap';

type Todo = {
  _id: string;
  title: string;
  description: string;
  status: boolean;
};

const URL = 'http://localhost:3000/api/todo';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(URL);
      setTodos(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await axios.delete(`${URL}/${todoId}`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (todoId: string, newStatus: boolean) => {
    try {
      await axios.put(`${URL}/${todoId}`, { status: newStatus });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTodo = async () => {
    try {
      await axios.post(URL, newTodo);
      fetchTodos();
      setNewTodo({ title: '', description: '' });
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1 className='mt-4 mb-3'>Todo List</h1>
      <Button
        variant='primary'
        onClick={() => {
          setSelectedTodo(null);
          setShowModal(true);
        }}
        className='mb-3'
      >
        Add Todo
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTodo ? 'Edit Todo' : 'Add Todo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formBasicTitle'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter title'
                value={selectedTodo ? selectedTodo.title : newTodo.title}
                onChange={(e) =>
                  selectedTodo
                    ? setSelectedTodo({
                        ...selectedTodo,
                        title: e.target.value,
                      })
                    : setNewTodo({ ...newTodo, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId='formBasicDescription'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter description'
                value={
                  selectedTodo ? selectedTodo.description : newTodo.description
                }
                onChange={(e) =>
                  selectedTodo
                    ? setSelectedTodo({
                        ...selectedTodo,
                        description: e.target.value,
                      })
                    : setNewTodo({ ...newTodo, description: e.target.value })
                }
              />
            </Form.Group>{' '}
            {selectedTodo && (
              <Form.Group controlId='formBasicStatus'>
                <Form.Check
                  type='checkbox'
                  label='Status'
                  checked={selectedTodo.status}
                  onChange={(e) =>
                    setSelectedTodo({
                      ...selectedTodo,
                      status: e.target.checked,
                    })
                  }
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={handleAddTodo}>
            {selectedTodo ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>

      <ListGroup>
        {todos.map((todo) => (
          <Card
            key={todo._id}
            className='mb-3 shadow-sm'
            border={todo.status ? 'success' : 'danger'}
            style={{ transition: 'transform 0.2s' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Card.Body>
              <Card.Title>{todo.title}</Card.Title>
              <Card.Text>{todo.description}</Card.Text>
              <Button
                variant='primary'
                onClick={() => handleToggleStatus(todo._id, !todo.status)}
                className='mr-2'
              >
                {todo.status ? 'Mark Incomplete' : 'Mark Complete'}
              </Button>{' '}
              <Button
                variant='danger'
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </ListGroup>
    </Container>
  );
};

export default TodoList;
