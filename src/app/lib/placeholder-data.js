// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    email: "user@nextmail.com",
    password: "123456",
  },
];

const todos = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Give Fred a bath.",
    complete: false,
    due_date: "2024-04-01",
    completed_date: null,
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Groceries.",
    complete: false,
    due_date: "2024-04-06",
    completed_date: null,
  },
  {
    id: "3958dc9e-737f-4377-85e9-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Laundry",
    complete: false,
    due_date: "2024-04-06",
    completed_date: null,
  },
  {
    id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Go to the bank",
    complete: false,
    due_date: "2024-04-10",
    completed_date: null,
  },
  {
    id: "3958dc9e-787f-4377-85e9-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Wash the car",
    complete: false,
    due_date: "2024-04-15",
    completed_date: null,
  },
];

const events = [
  {
    id: "3958dc6e-787f-4377-85e9-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Carolyn's Birthday",
    date: "2024-04-15",
  },
  {
    id: "3958dc7e-787f-4377-85e9-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Ruby Event",
    date: "2024-04-24",
  },
  {
    id: "3958dc8e-787f-4377-85e9-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Park Hang",
    date: "2024-04-20",
  },
  {
    id: "3958dc7e-787f-4377-85e8-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Sarah's Birthday Dinner",
    date: "2024-04-27",
  },
  {
    id: "3958dc7e-707f-4377-85e9-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Academy of Science",
    date: "2024-04-25",
  },
];

const habits = [
  {
    id: "3958dc0e-787f-4377-85e9-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "No Phone In Bed",
  },
  {
    id: "3958dc0e-787f-4377-85e9-fec4b6a6492a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "No Spend",
  },
  {
    id: "3958dc0e-787f-4377-85e9-fec4b6a6452a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Workout",
  },
  {
    id: "3958dc0e-987f-4377-85e9-fec4b6a6452a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Supplements",
  },
  {
    id: "3956dc0e-787f-4377-85e9-fec4b6a6452a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Code",
  },
  {
    id: "3958dc0e-787f-4377-85e9-fec4b6a6452a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Wake Up Before 8",
  },
];

const configs = [
  {
    id: "3848dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    start_date: "2024-2-01",
    hydration_type: "oz",
    hydration_goal: "80",
    bedtime_goal: "21",
    waketime_goal: "7",
  },
  {
    id: "3948dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    start_date: "2024-4-01",
    hydration_type: "oz",
    hydration_goal: "80",
    bedtime_goal: "22",
    waketime_goal: "8",
  },
];

const config_habits = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    config_id: "3948dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3958dc0e-787f-4377-85e9-fec4b6a6452a",
  },
  {
    id: "420544b2-4001-4271-9855-fec4b6a6442a",
    config_id: "3948dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3956dc0e-787f-4377-85e9-fec4b6a6452a",
  },
  {
    id: "430544b2-4001-4271-9855-fec4b6a6442a",
    config_id: "3948dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3956dc0e-787f-4377-85e9-fec4b6a6452a",
  },
  {
    id: "440544b2-4001-4271-9855-fec4b6a6442a",
    config_id: "3948dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3958dc0e-987f-4377-85e9-fec4b6a6452a",
  },
  {
    id: "3958dc0e-787f-4377-85e9-fec4b6a6492a",
    config_id: "3848dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3958dc0e-787f-4377-85e9-fec4b6a6492a",
  },
  {
    id: "460544b2-4001-4271-9855-fec4b6a6442a",
    config_id: "3848dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3958dc0e-787f-4377-85e9-fec4b6a6442a",
  },
  {
    id: "470544b2-4001-4271-9855-fec4b6a6442a",
    config_id: "3848dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3958dc0e-787f-4377-85e9-fec4b6a6442a",
  },
];

const daily_trackings = [
  {
    id: "3948dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-01",
    hydration: "70",
    bedtime: "22",
    waketime: "9",
  },
  {
    id: "3848dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-02",
    hydration: "40",
    bedtime: "20",
    waketime: "6",
  },
  {
    id: "3748dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-03",
    hydration: "30",
    bedtime: "23",
    waketime: "8",
  },
  {
    id: "3748dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-04",
    hydration: "45",
    bedtime: "22",
    waketime: "7",
  },
  {
    id: "3548dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-05",
    hydration: "40",
    bedtime: "22",
    waketime: "8",
  },
  {
    id: "3448dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-06",
    hydration: "40",
    bedtime: "21",
    waketime: "7",
  },
  {
    id: "3348dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-07",
    hydration: "43",
    bedtime: "21",
    waketime: "9",
  },
  {
    id: "3248dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-08",
    hydration: "40",
    bedtime: "21",
    waketime: "6",
  },
  {
    id: "3148dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-09",
    hydration: "40",
    bedtime: "19",
    waketime: "6",
  },
  {
    id: "3947dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-10",
    hydration: "60",
    bedtime: "20",
    waketime: "6",
  },
  {
    id: "3946dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-11",
    hydration: "60",
    bedtime: "22",
    waketime: "6",
  },
  {
    id: "3945dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-12",
    hydration: "45",
    bedtime: "20",
    waketime: "8",
  },
  {
    id: "3944dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-13",
    hydration: "40",
    bedtime: "20",
    waketime: "6",
  },
  {
    id: "3943dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-15",
    hydration: "30",
    bedtime: "22",
    waketime: "7",
  },
  {
    id: "3942dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    date: "2024-04-17",
    hydration: "60",
    bedtime: "21",
    waketime: "8",
  },
];

const daily_tracking_habits = [
  {
    id: "3948dc0e-779f-4377-85e9-fec4b6a6542a",
    daily_tracking_id: "3848dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3958dc0e-787f-4377-85e9-fec4b6a6442a",
    completed: true,
  },
  {
    id: "3848dc0e-779f-4377-85e9-fec4b6a6542a",
    daily_tracking_id: "3943dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3956dc0e-787f-4377-85e9-fec4b6a6452a",
    completed: true,
  },
  {
    id: "3748dc0e-779f-4377-85e9-fec4b6a6542a",
    daily_tracking_id: "3948dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3958dc0e-987f-4377-85e9-fec4b6a6452a",
    completed: true,
  },
  {
    id: "3648dc0e-779f-4377-85e9-fec4b6a6542a",
    daily_tracking_id: "3942dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3958dc0e-787f-4377-85e9-fec4b6a6452a",
    completed: true,
  },
  {
    id: "3548dc0e-779f-4377-85e9-fec4b6a6542a",
    daily_tracking_id: "3943dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3956dc0e-787f-4377-85e9-fec4b6a6452a",
    completed: true,
  },
  {
    id: "3448dc0e-779f-4377-85e9-fec4b6a6542a",
    daily_tracking_id: "3943dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3958dc0e-787f-4377-85e9-fec4b6a6452a",
    completed: true,
  },
  {
    id: "3348dc0e-779f-4377-85e9-fec4b6a6542a",
    daily_tracking_id: "3942dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3958dc0e-787f-4377-85e9-fec4b6a6492a",
    completed: true,
  },
  {
    id: "3248dc0e-779f-4377-85e9-fec4b6a6542a",
    daily_tracking_id: "3943dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3958dc0e-787f-4377-85e9-fec4b6a6492a",
    completed: true,
  },
  {
    id: "3148dc0e-779f-4377-85e9-fec4b6a6542a",
    daily_tracking_id: "3943dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3958dc0e-787f-4377-85e9-fec4b6a6492a",
    completed: true,
  },
  {
    id: "2348dc0e-779f-4377-85e9-fec4b6a6542a",
    daily_tracking_id: "3748dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3956dc0e-787f-4377-85e9-fec4b6a6452a",
    completed: true,
  },
  {
    id: "3838dc0e-779f-4377-85e9-fec4b6a6542a",
    daily_tracking_id: "3943dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3958dc0e-787f-4377-85e9-fec4b6a6442a",
    completed: true,
  },
  {
    id: "3858dc0e-779f-4377-85e9-fec4b6a6542a",
    daily_tracking_id: "3943dc0e-779f-4377-85e9-fec4b6a6542a",
    habit_id: "3956dc0e-787f-4377-85e9-fec4b6a6452a",
    completed: true,
  },
];

const annual_goals = [
  {
    id: "3948dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    year: "2024",
    description: "annual goal 1",
  },
  {
    id: "3848dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    year: "2024",
    description: "annual goal 2",
  },
  {
    id: "3748dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    year: "2024",
    description: "annual goal 3",
  },
];

const month_goals = [
  {
    id: "450544b2-4001-4271-9855-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    year: "2024",
    month: "3",
    description: "month goal 1",
  },
  {
    id: "420544b2-4001-4271-9855-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    year: "2024",
    month: "3",
    description: "month goal 2",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    year: "2024",
    month: "3",
    description: "month goal 3",
  },
];

const week_goals = [
  {
    id: "3548dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    year: "2024",
    week: "17",
    description: "week goal 1",
  },
  {
    id: "3448dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    year: "2024",
    week: "17",
    description: "week goal 2",
  },
  {
    id: "3348dc0e-779f-4377-85e9-fec4b6a6542a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    year: "2024",
    week: "17",
    description: "week goal 3",
  },
];

module.exports = {
  users,
  todos,
  events,
  habits,
  configs,
  daily_trackings,
  daily_tracking_habits,
  config_habits,
  annual_goals,
  month_goals,
  week_goals,
};
π;
