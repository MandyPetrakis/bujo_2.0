export type EventsDisplay = {
  id: string;
  user_id: string;
  description: string;
  date: string;
};

export type HabitsDisplay = {
  id: string;
  user_id: string;
  description: string;
  active: boolean;
  active_month: string;
  dates_completed: Date[];
};

export type TodoDisplay = {
  id: string;
  user_id: string;
  description: string;
  complete: boolean;
  due_date: string;
  completed_date: string;
};

export type SleepDisplay = {
  id: string;
  user_id: string;
  date: Date;
  bed_time: string;
  wake_up_time: string;
};

export type HydrationDisplay = {
  id: string;
  user_id: string;
  date: Date;
  units: number;
};
