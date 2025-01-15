import { Router } from "express";
import { TodoRouter } from "./todoRouter/todoRouter";

export class AppRouter {
  static get routes(): Router {
    const router = Router();
    router.use("/api/todos", TodoRouter.routes);
    return router;
  }
}
