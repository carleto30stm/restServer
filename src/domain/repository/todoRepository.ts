import { TodoDTO } from "../dtos";
import { TodoEntity } from "../entities/todoEntity";




export abstract class  TodoRepository {
    abstract create  ( createTodo: TodoDTO) : Promise<TodoEntity>;

    abstract getAll(): Promise<TodoEntity[]>;
    abstract findById(id:number): Promise<TodoEntity>;
    abstract updateById(id: number, updateTodo: TodoDTO): Promise<TodoEntity>;
    abstract deleteById(id:number): Promise<TodoEntity>;
}