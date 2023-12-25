export interface ITask {
  value: string;
  completed: boolean;

  toggleCompleted: () => void;
}

export class Task implements ITask {
  value: string;
  completed: boolean;

  constructor(value = "", completed = false) {
    this.value = value;
    this.completed = completed;
  }

  toggleCompleted = () => {
    this.completed = !this.completed;
  };
}
