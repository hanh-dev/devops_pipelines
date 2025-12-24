import { ToDoRepository } from './todo.repository';
import { CreateToDoDTO, TodoQueryDTO, UpdateToDoDTO } from './todo.type';

const TODO_NOT_FOUND_ERROR = 'Todo not found';

export const ToDoService = {
  async createToDoTask(dto: CreateToDoDTO) {
    return await ToDoRepository.createToDoTask(dto);
  },

  async getTodos(query: TodoQueryDTO) {
    return await ToDoRepository.getTodos(query);
  },

  async getTodoById(id: number) {
    const todo = await ToDoRepository.getTodoById(id);
    if (!todo) {
      throw new Error(TODO_NOT_FOUND_ERROR);
    }
    return todo;
  },

  async updateToDo(id: number, dto: UpdateToDoDTO) {
    await ToDoService.getTodoById(id);
    return await ToDoRepository.updateTodo(id, dto);
  },

  async deleteToDo(id: number) {
    await ToDoService.getTodoById(id);
    return await ToDoRepository.deleteTodo(id);
  },
};
