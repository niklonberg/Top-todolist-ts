import { isToday, addDays, isWithinInterval } from 'date-fns';
import {
  Task,
  TodoManagerInterface,
  TodoListItemWithDataset,
} from './utils/interfaces';

/* 

AM I NECESSARY? I think so.

ALL THAT NEEDS TO CHANGE IS WHERE THE DATA IS STORED, AND A 
COUPLE OF MINOR DETAILS. can we not make the methods we have to work with the 
data from database instead of the internal array?

*/

// add documentation to below class like this:
/**
 * Get a specific Todo from the project.
 * @param projects - The project containing the Todos.
 * @param todoID - The ID of the Todo to retrieve.
 * @returns The Todo with the specified ID.
 */
// implements TodoManagerInterface
class TodoManager {}

export default TodoManager;
