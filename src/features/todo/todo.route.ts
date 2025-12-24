import { Router } from 'express';

import { ToDoController } from './todo.controller';

const todoRoutes: Router = Router();

todoRoutes.post('/', ToDoController.createNewTask);
todoRoutes.get('/', ToDoController.getAllTasks);
todoRoutes.get('/:id', ToDoController.getTaskById);
todoRoutes.put('/:id', ToDoController.updateTask);
todoRoutes.delete('/:id', ToDoController.deleteTask);

export default todoRoutes;
