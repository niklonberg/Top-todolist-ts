abstract class DataManager<T> {
  abstract add(): void;

  abstract get(): T;

  abstract edit(): T;

  abstract delete(): void;
}
