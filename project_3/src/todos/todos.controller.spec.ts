import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from "./todos.service";
import { ITodo } from "./interfaces/todo.interface";

const todoEntityList: ITodo[] = [
  {
    userId: 1,
    id: 1,
    title: "do something",
    completed: false
  }
];


describe('TodosController', () => {
  let todoController: TodosController;
  let todoService: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            getAllTodos: jest.fn().mockResolvedValue(todoEntityList),
          }
        }
      ]

    }).compile();

    todoController = module.get<TodosController>(TodosController);
    todoService = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });


  describe("index", () => {

    it("should return a todo list entity successfully", async () => {
      const result = await todoController.index();
      // Assert
      expect(result).toEqual(todoEntityList);
      expect(typeof result).toEqual("object");
      expect(todoService.getAllTodos).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception", () => {
      jest.spyOn(todoService, "getAllTodos").mockRejectedValueOnce(new Error());
      // Assert
      expect(todoController.index()).rejects.toThrowError();
    });

  });


});
