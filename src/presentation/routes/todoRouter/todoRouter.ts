import { Router } from "express";
import { TodoController } from "../../controllers/to-doController";



export class TodoRouter {
    static get routes(): Router {
        const router = Router();
        const todoController = new TodoController();

        router.get('/',todoController.getAll);
        router.get('/:id',todoController.getTodoById);
        router.put('/:id',todoController.updateTodo);
        router.post('/',todoController.createTodo);
        router.delete('/:id',todoController.deleteTodo);

        return router;
    }
}