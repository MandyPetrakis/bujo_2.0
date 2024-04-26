import { UUID } from "crypto";

export type EventsDisplay = {
  id: string;
  user_id: string;
  description: string;
  date: string;
};

export type HabitsDisplay = {
  id: string;
  description: string;
};

export type DailyHabitsData = {
  id: string;
  completed: boolean;
  habit_id: string;
  date: Date;
};

export type ConfigHabits = {
  id: string;
  habit_id: UUID;
  config_id: string;
};

export type Configs = {
  id: string;
  user_id: string;
  start_date: string;
  hydration_type: string;
  hydration_goal: string;
  bedtime_goal: string;
  waketime_goal: string;
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
