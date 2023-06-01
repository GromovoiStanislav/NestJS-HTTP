import { Controller, Get } from "@nestjs/common";
import { TodosService } from "./todos.service";

@Controller("todos")
export class TodosController {

  constructor(
    private readonly todosService: TodosService
  ) {
  }

  // http://localhost:3000/api/todos
  @Get()
  async index() {
    return this.todosService.getAllTodos();
  }

}
