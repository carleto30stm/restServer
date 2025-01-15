
import { Request, Response } from "express"

const todos = [
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Walk the dog', completed: true },
    { id: 4, text: 'Do running', completed: false },
    { id: 5, text: 'Do it', completed: false },
    { id: 6, text: 'Do ....', completed: false },
  ];

export class TodoController{
    public getAll =  (req: Request , res: Response) => {
        res.json({
            todos
        })
    } 

    public getTodoById = (req: Request , res: Response) => {

        const { id } = req.params;
        const todo = todos.find(todo => todo.id === Number(id));

        if (!todo) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
         res.json(todo);
    }
    public createTodo = (req: Request, res: Response) => {
        const { text, completed } = req.body;
        const newTodo = { id: todos.length + 1, text, completed };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    }
    public updateTodo = (req: Request, res: Response) => {
        const { id } = req.params;
        const { text, completed } = req.body;
        const todo = todos.find(todo => todo.id === Number(id));
        if ( isNaN(Number(id)) ){
        res.status(400).json({ error: 'Invalid ID supplied' });
        return;
        }
        if (!todo) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        todo.text = text || todo.text;
        todo.completed = completed || todo.completed;
        res.json(todo);
    }
    public deleteTodo = (req: Request, res: Response) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex(todo => todo.id === Number(id));
        if (todoIndex === -1) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        todos.splice(todoIndex, 1);
        res.status(204).send();
    }
}