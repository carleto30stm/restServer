import { Router } from "express";
import { TodoController } from "../../controllers/to-doController";
import { TodoDataSourceImpl, TodoRepositoryImpl } from "../../../infrastructure";




export class TodoRouter {
    static get routes(): Router {
        const router = Router();
        const tododataSource = new TodoDataSourceImpl();
        const todoRepository = new TodoRepositoryImpl(tododataSource);
        const todoController = new TodoController(todoRepository);

        router.get('/',todoController.getAll);
        router.get('/:id',todoController.getTodoById);
        router.put('/:id',todoController.updateTodo);
        router.post('/',todoController.createTodo);
        router.delete('/:id',todoController.deleteTodo);

        return router;
    }
}