import { isToday, addDays, isWithinInterval } from 'date-fns';
import { EventEmitter } from 'events';
import { Task, TaskManagerInterface } from './utils/interfaces';
import parseTaskDueDate from './utils/parseTaskDueDate';

// TODO add documentation to below class like this:
/**
 * Get a specific Todo from the project.
 * @param projects - The project containing the Todos.
 * @param todoID - The ID of the Todo to retrieve.
 * @returns The Todo with the specified ID.
 */
class TaskManager implements TaskManagerInterface {
  // private user: User;

  currSelectedTask: null | Task;

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

  getNext7DaysTasks() {
    const tasks = this.getTasks();
    const today = new Date().setHours(0, 0, 0, 0);
    const sevenDaysLater = addDays(today, 7);
    return tasks.reduce(
      (acc, curr) => [
        ...acc,
        ...curr.subtasks.filter((subtask) =>
          isWithinInterval(subtask.dueDate, {
            start: today,
            end: sevenDaysLater,
          }),
        ),
      ],
      [],
    );
  }

  /* Set methods */
  setSelectedTask(taskID: string) {
    this.currSelectedTask = this.getTask(taskID);
    console.log('curr task: ', this.currSelectedTask);
  }

  resetSelectedTask() {
    this.currSelectedTask = null;
  }

  /* Edit methods */
  async editTask(taskToEdit: Task, newTask: Task) {
    try {
      const response = await fetch(`${this.baseURL}/${taskToEdit._id}`, {
        method: 'PUT',
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
      }
      const responseBody = await response.json();
      let updatedTask = responseBody.updatedTask as Task;
      updatedTask = parseTaskDueDate(updatedTask);
      const taskIndex = this.tasks.findIndex(
        (task) => task.sortOrder === updatedTask.sortOrder,
      );
      this.tasks[taskIndex] = updatedTask;
      this.currSelectedTask = this.tasks[taskIndex];
      this.eventEmitter.emit('taskFormSubmit');
    } catch (error) {
      console.error(error);
    }
  }

  async editSubtask(taskToEdit: Task, subtaskToEdit: Task, newSubtask: Task) {}

  async toggleSubtaskCompleted(subtaskIndex: number) {
    try {
      const response = await fetch(
        `${this.baseURL}/${this.currSelectedTask._id}/editSubtask/${subtaskIndex}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dateCompleted: new Date() }),
        },
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`,
        );
        return response;
      }
      let updatedTask = (await response.json()) as Task;
      updatedTask = parseTaskDueDate(updatedTask);
      const updatedTaskIndex = this.tasks.findIndex(
        (task) => task._id === updatedTask._id,
      );
      this.tasks[updatedTaskIndex] = updatedTask;
      this.currSelectedTask = this.tasks[updatedTaskIndex];
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /* Add methods */
  async addTask(newTask: Task) {
    try {
      const response = await fetch(`${this.baseURL}`, {
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
      }
      let newTaskFromDB = (await response.json()) as Task;
      newTaskFromDB = parseTaskDueDate(newTaskFromDB);
      this.tasks.push(newTaskFromDB);
      this.currSelectedTask = this.tasks[this.tasks.length - 1];
      this.eventEmitter.emit('taskFormSubmit');
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  async addSubtask(newSubtask: Task) {
    try {
      const response = await fetch(
        `${this.baseURL}/${this.currSelectedTask._id}/createSubtask`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSubtask),
        },
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`,
        );
      }
      const updatedTask = (await response.json()) as Task;
      const updatedTaskIndex = this.tasks.findIndex(
        (task) => task._id === updatedTask._id,
      );
      this.tasks[updatedTaskIndex] = updatedTask;
      this.currSelectedTask = this.tasks[updatedTaskIndex];
      this.eventEmitter.emit('taskFormSubmit');
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  /* Delete methods */
  async deleteTask(taskID: string) {
    try {
      const response = await fetch(`${this.baseURL}/${taskID}`, {
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
      this.resetSelectedTask();
      return response;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }

  async deleteSubtask(subtaskIndex: number) {
    try {
      const response = await fetch(
        `${this.baseURL}/${this.currSelectedTask._id}/deleteSubtask/${subtaskIndex}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`,
        );
        return response;
      }
      const updatedTask = (await response.json()) as Task;
      const updatedTaskIndex = this.tasks.findIndex(
        (task) => task._id === updatedTask._id,
      );
      this.tasks[updatedTaskIndex] = updatedTask;
      this.currSelectedTask = this.tasks[updatedTaskIndex];
      console.log(this.currSelectedTask);
      return response;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }

  onTaskFormSubmitSuccess(callback: () => void) {
    this.eventEmitter.on('taskFormSubmit', callback);
  }
}

export default TaskManager;
