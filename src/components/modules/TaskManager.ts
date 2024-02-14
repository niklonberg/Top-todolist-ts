import { isToday, addDays, isWithinInterval } from 'date-fns';
import { EventEmitter } from 'events';
import {
  Task,
  TaskManagerInterface,
  TodoListItemWithDataset,
} from './utils/interfaces';

// TODO add documentation to below class like this:
/**
 * Get a specific Todo from the project.
 * @param projects - The project containing the Todos.
 * @param todoID - The ID of the Todo to retrieve.
 * @returns The Todo with the specified ID.
 */
class TaskManager implements TaskManagerInterface {
  private eventEmitter: EventEmitter;
  // private user: User;

  private tasks: Task[];

  currSelectedTask: null | Task; // Should we bother with this?
  // could just split addTodo into two functions.

  parentTask: Task | null; // we need me?

  constructor(tasksFromDB: Task[]) {
    // this.user = user;
    this.tasks = tasksFromDB;
    [this.currSelectedTask] = this.tasks;
    this.eventEmitter = new EventEmitter();
  }

  /* Get methods */
  getTasks(): Task[] {
    return this.tasks;
  }

  getTask(taskID: string): Task {
    return this.tasks.find((task) => task._id === taskID);
  }

  getSubtasks(taskID: string): Task[] {
    return this.getTask(taskID).subtasks;
  }

  // getTodayTasks(): Task[] {
  //   const todos = this.getTopLevelTasks();
  //   return todos.reduce(
  //     (acc, curr) => [
  //       ...acc,
  //       ...curr.children.filter((childTodo) => isToday(childTodo.dueDate)),
  //     ],
  //     [],
  //   );
  // }

  // getNext7DaysTasks() {
  //   const todos = this.getTopLevelTasks();
  //   const today = new Date();
  //   today.setHours(0, 0, 0);
  //   const sevenDaysLater = addDays(today, 7);
  //   return todos.reduce(
  //     (acc, curr) => [
  //       ...acc,
  //       ...curr.children.filter((childTodo) =>
  //         isWithinInterval(childTodo.dueDate, {
  //           start: today,
  //           end: sevenDaysLater,
  //         }),
  //       ),
  //     ],
  //     [],
  //   );
  // }

  // /* Edit methods */
  // editTodo(
  //   todoToEdit: Task,
  //   newTodo: Task,
  //   todoArray: Task[] = this.topLevelTodos,
  // ): void {
  //   const foundTodo = todoArray.find(
  //     (currTodo) => currTodo.todoID === todoToEdit.todoID,
  //   );
  //   if (foundTodo) {
  //     Object.assign(foundTodo, { ...newTodo, children: foundTodo.children });
  //   } else {
  //     todoArray.forEach((childTodo) =>
  //       this.editTodo(todoToEdit, newTodo, childTodo.children),
  //     );
  //   }
  // }

  // toggleIsCompleted(todoID: number): Task {
  //   const todo = this.getTodo(todoID);
  //   todo.isCompleted = !todo.isCompleted;
  //   console.log('Todo complete: ', todo.isCompleted);
  //   this.toggleCompletedDate(todo);
  //   if (this.parentTodo.children.every((childTodo) => childTodo.isCompleted)) {
  //     // toggle parent complete
  //   }TodoManager

  /* Set methods */
  setSelectedTask(todoID: string): void {
    console.log('todoID is: ', todoID);
    this.currSelectedTask = this.getTask(todoID);
    console.log('curr selected todo: ', this.currSelectedTask);
  }

  // resetSelectedTodo(): void {
  //   this.currSelectedTodo = null;
  // }

  /* Add methods */
  async addTask(newTask: Task): Promise<void> {
    try {
      const response = await fetch('http://localhost:3000/tasks/createTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      console.log(response);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`,
        );
      } else {
        const result = (await response.json()) as Task;
        this.tasks.push(result);
        this.eventEmitter.emit('taskAdded');
        console.log(this.tasks);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  // addSubtask(task: Task): void {
  //   // push task sent back from database into subtasks of currSelected
  //   this.currSelectedTask.subtasks.push(task);
  //   console.log(this.currSelectedTask.subtasks);
  // }

  // /* Delete methods */
  // deleteTopLevelTodo(todoID: number): void {
  //   this.topLevelTodos = this.topLevelTodos.filter(
  //     (todo) => todo.todoID !== todoID,
  //   );
  // }

  // deleteChildTodo(todoID: number): void {
  //   const todo = this.getTodo(todoID);
  //   console.log('todo to delete: ', todo);
  //   this.parentTodo.children = this.parentTodo.children.filter(
  //     (childTodo) => childTodo !== todo,
  //   );
  // }

  onTaskAdded(callback: () => void) {
    this.eventEmitter.on('taskAdded', callback);
  }
}

export default TaskManager;
