import { isToday, addDays, isWithinInterval } from 'date-fns';
import { EventEmitter } from 'events';
import { Task, TaskManagerInterface } from './utils/interfaces';
import formatTaskDueDate from './utils/formatTaskDueDate';

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
  async editTask(taskToEdit: Task, newTask: Task) {
    try {
      const response = await fetch(
        `${this.baseURL}/editTask/${taskToEdit._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        },
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`,
        );
      } else {
        const responseBody = await response.json();
        let updatedTask = responseBody.updatedTask as Task;
        updatedTask = formatTaskDueDate(updatedTask);
        const index = this.tasks.findIndex(
          (task) => task.sortOrder === updatedTask.sortOrder,
        );
        this.tasks[index] = updatedTask;
        this.eventEmitter.emit('taskFormSubmit');
      }
    } catch (error) {
      console.error(error);
    }
  }

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
    console.log('curr task: ', this.currSelectedTask);
    console.log(
      'curr typeof task.dueDate: ',
      typeof this.currSelectedTask.dueDate,
    );
    console.log('curr task.dueDate val: ', this.currSelectedTask.dueDate);
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
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`,
        );
      } else {
        let newTaskFromDB = (await response.json()) as Task;
        newTaskFromDB = formatTaskDueDate(newTaskFromDB);
        this.tasks.push(newTaskFromDB);
        this.currSelectedTask = this.tasks[this.tasks.length - 1];
        this.eventEmitter.emit('taskFormSubmit');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  async addSubtask(newSubtask: Task) {
    try {
      const response = await fetch(`${this.baseURL}/createSubtask`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubtask),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`,
        );
      } else {
        console.log('submit subtask succes from backend');
        // const
        // this.eventEmitter.emit('taskFormSubmit');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
    // push task sent back from database into subtasks of currSelected
    // this.currSelectedTask.subtasks.push(task);
    // console.log(this.currSelectedTask.subtasks);
  }

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

  onTaskFormSubmitSuccess(callback: () => void) {
    this.eventEmitter.on('taskFormSubmit', callback);
  }
}

export default TaskManager;
