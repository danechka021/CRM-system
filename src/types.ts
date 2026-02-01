export interface Task {
  title: string;
  id: number;
  created: string;
  isDone: boolean;
}

export interface Results {
  data: Task[];

  info: {
    all: number;
    inWork: number;
    completed: number;
  };
  meta?: {
    totalAmount: number;
  };
}

export interface TodoRequest {
  title?: string;
  isDone?: boolean;
}
