// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
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
    date: "2024-04-27",
  },
  {
    id: "3958dc8e-787f-4377-85e9-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Park Hang",
    date: "2024-04-20",
  },
];

const habits = [
  {
    id: "3958dc0e-787f-4377-85e9-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Code",
    active_month: "2024-4-01",
    active: true,
    dates_completed: '{"2024-04-02", "2024-04-01", "2024-04-03", "2024-04-06"}',
  },
  {
    id: "3958dc0e-787f-4377-85e9-fec4b6a6492a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "No Caf",
    active_month: "2024-4-01",
    active: true,
    dates_completed: '{"2024-04-02", "2024-04-01", "2024-04-03", "2024-04-06"}',
  },
  {
    id: "3958dc0e-787f-4377-85e9-fec4b6a6452a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    description: "Workout",
    active_month: "2024-4-01",
    active: true,
    dates_completed: '{"2024-04-02", "2024-04-01", "2024-04-03", "2024-04-06"}',
  },
];

module.exports = {
  users,
  todos,
  events,
  habits,
};
