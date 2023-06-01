import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from "@nestjs/common";
import { ITodo } from './interfaces/todo.interface';
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";


@Injectable()
export class TodosService {
  private readonly logger = new Logger(TodosService.name);

  constructor(
    private readonly httpService: HttpService
  ) {}

  async getAllTodos() {
    let todos: ITodo[] = [];

    const url = 'https://jsonplaceholder.typicode.com/todos';

    const { status, data } = await firstValueFrom(
      this.httpService.get<ITodo[]>(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    if (status === 200) {
      todos = data;
    }

    return todos;
  }

}
