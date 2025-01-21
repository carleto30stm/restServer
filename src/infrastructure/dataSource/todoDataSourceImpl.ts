import { TodoDataSources, TodoEntity } from "../../domain";
import { prisma } from "../../postgres";

export class TodoDataSourceImpl implements TodoDataSources {
  async create(createTodo: TodoEntity): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({
        data: createTodo!,
      });
      return TodoEntity.fromObject(newTodo);
  }
  async getAll(): Promise<TodoEntity[]> {
    const findAllTodos = await prisma.todo.findMany();
    return findAllTodos.map(TodoEntity.fromObject);
  }
  async findById(id: number): Promise<TodoEntity> {
    if (isNaN(id)) {
      throw new Error(`Invalid ID supplied`);
    }
    const todo = await prisma.todo.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return TodoEntity.fromObject(todo);
  }
  async updateById(id: number, updateTodo: TodoEntity): Promise<TodoEntity> {
    const {text, completedAt } = updateTodo;
    if (completedAt && isNaN(Date.parse(completedAt?.toString()))) {
      throw new Error(`Invalid date format supplied`);
    }
    await this.findById(id);
    const todo = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        text,
        completedAt: completedAt ? new Date(completedAt) : null
      },
      
    });
    return TodoEntity.fromObject(todo);
  }
  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);
    const todo = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });
    return TodoEntity.fromObject(todo);
  }
}
