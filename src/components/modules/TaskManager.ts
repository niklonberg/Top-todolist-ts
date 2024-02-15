import { isToday, addDays, isWithinInterval } from 'date-fns';
import { EventEmitter } from 'events';
import { Task, TaskManagerInterface } from './utils/interfaces';

// TODO add documentation to below class like this:
/**
 * Get a specific Todo from the project.
 * @param projects - The project containing the Todos.
 * @param todoID - The ID of the Todo to retrieve.
 * @returns The Todo with the specified ID.
 */
class TaskManager implements TaskManagerInterface {
  // private user: User;

  currSelectedTask: null | Task; // Should we bother with this?
  // could just split addTodo into two functions.

  private eventEmitter: EventEmitter;

  constructor(
    private tasks: Task[],
    public baseURL: string,
  ) {
    // this.user = user;
    this.tasks = tasks;
    [this.currSelectedTask] = this.tasks;
    this.baseURL = baseURL;
    this.eventEmitter = new EventEmitter();
  }

  /* Get methods */
  getTasks() {
    return this.tasks;
  }

  getTask(taskID: string) {
    return this.tasks.find((task) => task._id === taskID);
  }

  getSubtasks(taskID: string) {
    return this.getTask(taskID).subtasks;
  }

  getTodayTasks() {
    const tasks = this.getTasks();
    return tasks.reduce(
      (acc, curr) => [
        ...acc,
        ...curr.subtasks.filter((subtask) => isToday(subtask.dueDate)),
      ],
      [],
    );
  }

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

  /* Edit methods */
  editTask(taskToEdit: Task, newTask: Task) {}

  // toggleIsCompleted(taskID: number) {
  //   const todo = this.getTask(taskID);
  //   todo.isCompleted = !todo.isCompleted;
  //   console.log('Todo complete: ', todo.isCompleted);
  //   this.toggleCompletedDate(todo);
  //   if (this.parentTodo.children.every((childTodo) => childTodo.isCompleted)) {
  //     // toggle parent complete
  //   }
  // }

  /* Set methods */
  setSelectedTask(todoID: string) {
    this.currSelectedTask = this.getTask(todoID);
  }

  resetSelectedTask() {
    this.currSelectedTask = null;
  }

  /* Add methods */
  async addTask(newTask: Task) {
    try {
      const response = await fetch(`${this.baseURL}/createTask`, {
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

  // addSubtask(task: Task) {
  //   // push task sent back from database into subtasks of currSelected
  //   this.currSelectedTask.subtasks.push(task);
  //   console.log(this.currSelectedTask.subtasks);
  // }

  /* Delete methods */
  async deleteTask(taskID: string) {
    try {
      const response = await fetch(`${this.baseURL}/deleteTask/${taskID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`,
        );
        return response;
      }
      this.tasks = this.tasks.filter((task) => task._id !== taskID);
      return response;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }

  // deleteSubtask is actually just an update of the task that contains it, with
  // the subtask removed from its .subtasks array right?
  // deleteChildTodo(todoID: number) {
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
