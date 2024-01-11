abstract class DataManager<T> {
  abstract add(): void;

  abstract get(): T;

  abstract edit(): T;

  abstract delete(): void;
}

/* our DataManagers could extend the above?
so we have could have a TodoManager, a UserManager etc. */

/* example
interface DataManagerInterface<T> {
  addItem(): void;
  getItem(): T;
  editItem(): T;
  deleteItem(): void;
}

abstract class DataManager<T> implements DataManagerInterface<T> {
  abstract addItem(): void;

  abstract getItem(): T;

  abstract editItem(): T;

  abstract deleteItem(): void;
}

// Example usage in a concrete subclass
class TodoManager extends DataManager<Todo> {
  // Implement the abstract methods here
  addItem(): void {
    // Implementation
  }

  getItem(): Todo {
    // Implementation
    return {} as Todo;
  }

  editItem(): Todo {
    // Implementation
    return {} as Todo;
  }

  deleteItem(): void {
    // Implementation
  }
}

// Example usage in another concrete subclass
class UserManager extends DataManager<User> {
  // Implement the abstract methods here
  addItem(): void {
    // Implementation
  }

  getItem(): User {
    // Implementation
    return {} as User;
  }

  editItem(): User {
    // Implementation
    return {} as User;
  }

  deleteItem(): void {
    // Implementation
  }
}
*/
