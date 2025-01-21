import { TodoDataSources, TodoDTO, TodoEntity, TodoRepository } from '../../domain';




export class TodoRepositoryImpl implements TodoRepository {
    constructor(
        private readonly dataSource: TodoDataSources
    ){}
    create(createTodo: TodoDTO): Promise<TodoEntity> {
       return this.dataSource.create(createTodo);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.dataSource.getAll();
    }
    findById(id: number): Promise<TodoEntity> {
        return this.dataSource.findById(id);
    }
    updateById(id: number,updateTodo: TodoDTO): Promise<TodoEntity> {
        return this.dataSource.updateById(id, updateTodo);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.dataSource.deleteById(id);
    }

}