//      

                                                
                                                                     
                                                 
                                                         

export function isUserObject(obj     )          {
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

export function isLowOrCompletedTask(task              )          {
  return task.priority === "low" || task.completed;
}

export function not(f) {
  return (arg) => !f(arg);
}
