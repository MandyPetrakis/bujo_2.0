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
  start_date: Date;
  hydration_type: string;
  hydration_goal: number;
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
  bedtime: string;
  waketime: string;
};

export type SleepDisplayRange = {
  earliest_time: number;
  latest_time: number;
};

export type SleepGoalRange = {
  earliest_bedtime_goal: number;
  latest_waketime_goal: number;
};

export type SleepRange = {
  earliest_bedtime: number;
  latest_waketime: number;
};

export type HydrationDisplay = {
  id: string;
  hydration: string;
};
