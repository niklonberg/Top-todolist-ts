import { isToday, addDays, isWithinInterval } from 'date-fns';
import { EventEmitter } from 'events';
import {
  Task,
  SubtaskWithImpParentInfo,
  TaskManagerInterface,
} from './utils/interfaces';
import parseTaskDateProps from './utils/parseTaskDateProps';

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

  getSubtasksDueToday() {
    const tasks = this.getTasks();
    const todayTasks: SubtaskWithImpParentInfo[] = [];
    tasks.forEach((task) => {
      task.subtasks.forEach((subtask, subtaskIndex) => {
        if (isToday(subtask.dueDate)) {
          todayTasks.push({
            ...subtask,
            parentTaskTitle: task.title,
            parentTaskID: task._id,
            subtaskIndex,
          });
        }
      });
    });
    return todayTasks;
  }

  getSubtasksDueWeek() {
    const tasks = this.getTasks();
    const today = new Date().setHours(0, 0, 0, 0);
    const tomorrow = addDays(today, 1);
    const sevenDaysLater = addDays(tomorrow, 7);
    const weekTasks: SubtaskWithImpParentInfo[] = [];

    tasks.forEach((task) => {
      task.subtasks.forEach((subtask, subtaskIndex) => {
        if (
          isWithinInterval(subtask.dueDate, {
            start: tomorrow,
            end: sevenDaysLater,
          })
        ) {
          weekTasks.push({
            ...subtask,
            parentTaskTitle: task.title,
            parentTaskID: task._id,
            subtaskIndex,
          });
        }
      });
    });

    return weekTasks;
  }

  getSubtasksByPriority() {
    const subtasks: SubtaskWithImpParentInfo[] = this.getTasks()
      .flatMap((currTask) =>
        currTask.subtasks.map((subtask, subtaskIndex) => ({
          ...subtask,
          parentTaskTitle: currTask.title,
          parentTaskID: currTask._id,
          subtaskIndex,
        })),
      )
      .sort((a, b) => {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    return subtasks;
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
      const updatedTask = parseTaskDateProps(responseBody.updatedTask as Task);
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

  async editSubtask(subtaskIndex: number, newSubtask: Task, taskID: string) {
    try {
      const response = await fetch(
        `${this.baseURL}/${taskID}/editSubtask/${subtaskIndex}`,
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
        console.error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`,
        );
        return response;
      }
      const updatedTask = parseTaskDateProps((await response.json()) as Task);
      const updatedTaskIndex = this.tasks.findIndex(
        (task) => task._id === updatedTask._id,
      );
      this.tasks[updatedTaskIndex] = updatedTask;
      this.currSelectedTask = this.tasks[updatedTaskIndex];
      this.eventEmitter.emit('taskFormSubmit');
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async toggleSubtaskCompleted(subtaskIndex: number, taskID: string) {
    try {
      const response = await fetch(
        `${this.baseURL}/${taskID}/toggleSubtaskCompleted/${subtaskIndex}/`,
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
      const updatedTask = parseTaskDateProps((await response.json()) as Task);
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
      newTaskFromDB = parseTaskDateProps(newTaskFromDB);
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

  async deleteSubtask(subtaskIndex: number, taskID: string) {
    try {
      const response = await fetch(
        `${this.baseURL}/${taskID}/deleteSubtask/${subtaskIndex}/`,
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
      const updatedTask = parseTaskDateProps((await response.json()) as Task);
      const updatedTaskIndex = this.tasks.findIndex(
        (task) => task._id === updatedTask._id,
      );
      this.tasks[updatedTaskIndex] = updatedTask;
      this.currSelectedTask = this.tasks[updatedTaskIndex];
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
