// @flow

export type User = { id: number, name: string };
export type Task = { title: string, completed: boolean, user: User };
export type Priority = "low" | "middle" | "high";
export type PriorityTask = Task & { priority: Priority };

export function isUserObject(obj: any): boolean {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
  );
}

export class TaskManager {
  _tasks = [];

  add(task) {
    this._tasks.push(task);
  }

  completeTask(target) {
    if (isUserObject(target)) {
      this._tasks
        .filter((t) => t.user === target)
        .forEach((t) => (t.completed = true));
    } else {
      this._tasks
        .filter((t) => t.title === target)
        .forEach((t) => (t.completed = true));
    }
  }

  getTasks(predicate) {
    if (predicate === undefined) {
      return this._tasks;
    } else {
      return this._tasks.filter(predicate);
    }
  }
}

export function isLowOrCompletedTask(task: PriorityTask): boolean {
  return task.priority === "low" || task.completed;
}

export function not(f) {
  return (arg) => !f(arg);
}
