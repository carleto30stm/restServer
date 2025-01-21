import { Request, Response } from "express";
import { TodoDTO } from "../../domain/dtos";
import { TodoRepository } from "../../domain";


export class TodoController {
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}
  public createTodo = async (req: Request, res: Response) => {
    const [error, todoDto] = TodoDTO.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const newTodo = await this.todoRepository.create( todoDto!);
    res.status(201).json(newTodo!);
  };
  public getAll = async (req: Request, res: Response) => {
    const findAllTodos = await this.todoRepository.getAll()
    res.json(findAllTodos);
  };

  public getTodoById = async(req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
      const todo = await this.todoRepository.findById(Number(id));
      res.json(todo);      
    } catch (error: any) {
      res.status(404).json( {error: error.message});
    }
  };
  public updateTodo = async(req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const todo = await this.todoRepository.updateById(Number(id), {...req.body});
      res.json(todo);
      
    } catch (error: any) {
      res.status(404).json( {error: error.message});
      
    }
  
  };
  public deleteTodo = async(req: Request, res: Response) => {
    const { id } = req.params;
    try {
     const todoDeleted = await this.todoRepository.deleteById(Number(id));
      res.status(200).json(todoDeleted);     
    } catch (error: any) {
      res.status(404).json( {error: error.message});     
    }
  };
}
