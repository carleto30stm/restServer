import { Request, Response } from "express";
import { prisma } from "../../postgres";
import { TodoDTO } from "../../domain/dtos";


export class TodoController {
  public getAll = async (req: Request, res: Response) => {
    const findAllTodos = await prisma.todo.findMany();

    res.json(findAllTodos);
  };

  public getTodoById = async(req: Request, res: Response) => {
    const { id } = req.params;
    const todo = await prisma.todo.findFirst({
        where: {
            id: Number(id)
        }
    });

    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    res.json(todo);
  };
  public createTodo = async (req: Request, res: Response) => {
    const [error, todoDto] = TodoDTO.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const newTodo = await prisma.todo.create({
      data: todoDto!,
    });
    res.status(201).json(newTodo);
  };
  public updateTodo = async(req: Request, res: Response) => {
    const { id } = req.params;

    const { text } = req.body;

    const todo = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data:{    
            text,
      }
    });
    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid ID supplied" });
      return;
    }
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    res.json(todo);
  };
  public deleteTodo = async(req: Request, res: Response) => {
    const { id } = req.params;
    const todo  = await prisma.todo.findFirst({where: {id: Number(id)}});
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(204).send();
  };
}
