
export interface Task {
    task_id: number;
    task_name: string;
    start_time: string;
    end_time: string;
    status: boolean;
    list_id: number;
    list_name: string;
    notes: string;
}

export interface List {
    list_id: number;
    list_name: string;
    user_id: number;
    task_count: number;
  }
  