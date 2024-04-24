const { db } = require("@vercel/postgres");
const {
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
} = require("../src/app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, email, password)
        VALUES (${user.id}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedTodos(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "todos" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS todos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    description TEXT NOT NULL,
    complete BOOLEAN NOT NULL,
    due_date DATE,
    completed_date DATE
  );
`;

    console.log(`Created "todos" table`);

    // Insert data into the "todos" table
    const insertedTodos = await Promise.all(
      todos.map(
        (todo) => client.sql`
        INSERT INTO todos (user_id, description, complete, due_date, completed_date)
        VALUES (${todo.user_id}, ${todo.description}, ${todo.complete}, ${todo.due_date}, ${todo.completed_date})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedTodos.length} todos`);

    return {
      createTable,
      todos: insertedTodos,
    };
  } catch (error) {
    console.error("Error seeding todos:", error);
    throw error;
  }
}

async function seedEvents(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS events (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        description TEXT NOT NULL,
        user_id UUID NOT NULL,
        date DATE NOT NULL
      );
    `;

    console.log(`Created "events" table`);

    // Insert data into the "customers" table
    const insertedEvents = await Promise.all(
      events.map(
        (event) => client.sql`
        INSERT INTO events (id, description, user_id, date)
        VALUES (${event.id}, ${event.description}, ${event.user_id}, ${event.date})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedEvents.length} events`);

    return {
      createTable,
      events: insertedEvents,
    };
  } catch (error) {
    console.error("Error seeding events:", error);
    throw error;
  }
}

async function seedHabits(client) {
  try {
    // Create the "habits" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS habits (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        description TEXT NOT NULL,
        user_id UUID NOT NULL
      );
    `;

    console.log(`Created "habits" table`);

    // Insert data into the "habits" table
    const insertedHabits = await Promise.all(
      habits.map(
        (habit) => client.sql`
        INSERT INTO habits (id, description, user_id)
        VALUES (${habit.id}, ${habit.description}, ${habit.user_id})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedHabits.length} habits`);

    return {
      createTable,
      habits: insertedHabits,
    };
  } catch (error) {
    console.error("Error seeding habits:", error);
    throw error;
  }
}

async function seedConfigs(client) {
  try {
    // Create the "month_config" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS configs (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        start_date TEXT NOT NULL,
        hydration_type TEXT NOT NULL,
        hydration_goal TEXT NOT NULL,
        bedtime_goal TEXT NOT NULL,
        waketime_goal TEXT NOT NULL
      );
    `;

    console.log(`Created "configs" table`);

    // Insert data into the "config" table
    const insertedConfigs = await Promise.all(
      configs.map(
        (config) => client.sql`
        INSERT INTO configs (id, user_id, start_date, hydration_type, hydration_goal, bedtime_goal, waketime_goal)
        VALUES (${config.id}, ${config.user_id}, ${config.start_date}, ${config.hydration_type}, ${config.hydration_goal},  ${config.bedtime_goal}, ${config.waketime_goal})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedConfigs.length} configs`);

    return {
      createTable,
      configs: insertedConfigs,
    };
  } catch (error) {
    console.error("Error seeding configs:", error);
    throw error;
  }
}

async function seedDailyTrackings(client) {
  try {
    // Create the "daily trackings" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS daily_trackings (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        date TEXT NOT NULL,
        hydration TEXT NOT NULL,
        bedtime TEXT NOT NULL,
        waketime TEXT NOT NULL
      );
    `;

    console.log(`Created "daily_trackings" table`);

    // Insert data into the "daily_trackings" table
    const insertedDailyTrackings = await Promise.all(
      daily_trackings.map(
        (daily_tracking) => client.sql`
        INSERT INTO daily_trackings (id, user_id, date, hydration, bedtime, waketime)
        VALUES (${daily_tracking.id}, ${daily_tracking.user_id}, ${daily_tracking.date}, ${daily_tracking.hydration},  ${daily_tracking.bedtime}, ${daily_tracking.waketime})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedDailyTrackings.length} daily_trackings`);

    return {
      createTable,
      daily_trackings: insertedDailyTrackings,
    };
  } catch (error) {
    console.error("Error seeding daily_trackings:", error);
    throw error;
  }
}

async function seedDailyTrackingHabits(client) {
  try {
    // Create the "daily trackings habits" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS daily_tracking_habits (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        habit_id UUID NOT NULL,
        daily_tracking_id UUID NOT NULL,
        completed BOOLEAN NOT NULL
      );
    `;

    console.log(`Created "daily_tracking_habits" table`);

    // Insert data into the "daily_trackings_habits" table
    const insertedDailyTrackingsHabits = await Promise.all(
      daily_tracking_habits.map(
        (daily_tracking_habit) => client.sql`
        INSERT INTO daily_tracking_habits (id, habit_id, daily_tracking_id, completed)
        VALUES (${daily_tracking_habit.id}, ${daily_tracking_habit.habit_id}, ${daily_tracking_habit.daily_tracking_id}, ${daily_tracking_habit.completed})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(
      `Seeded ${insertedDailyTrackingsHabits.length} daily_tracking_habits`
    );

    return {
      createTable,
      daily_tracking_habits: insertedDailyTrackingsHabits,
    };
  } catch (error) {
    console.error("Error seeding daily_tracking_habits:", error);
    throw error;
  }
}

async function seedConfigHabits(client) {
  try {
    // Create the "config habits" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS config_habits (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        habit_id UUID NOT NULL,
        config_id UUID NOT NULL
      );
    `;

    console.log(`Created "config_habits" table`);

    // Insert data into the "config_habits" table
    const insertedConfigHabits = await Promise.all(
      config_habits.map(
        (config_habit) => client.sql`
        INSERT INTO config_habits (id, habit_id, config_id)
        VALUES (${config_habit.id}, ${config_habit.habit_id}, ${config_habit.config_id})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedConfigHabits.length} config_habits`);

    return {
      createTable,
      confid_habits: insertedConfigHabits,
    };
  } catch (error) {
    console.error("Error seeding config_habits:", error);
    throw error;
  }
}

async function seedAnnualGoals(client) {
  try {
    // Create the "annual goals" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS annual_goals (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        year TEXT NOT NULL,
        description TEXT NOT NULL
      );
    `;

    console.log(`Created "annual_goals" table`);

    // Insert data into the "annual_goals" table
    const insertedAnnualGoals = await Promise.all(
      annual_goals.map(
        (annual_goal) => client.sql`
        INSERT INTO annual_goals (id, user_id, year, description)
        VALUES (${annual_goal.id}, ${annual_goal.user_id}, ${annual_goal.year}, ${annual_goal.description})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedAnnualGoals.length} annual_goals`);

    return {
      createTable,
      annual_goals: insertedAnnualGoals,
    };
  } catch (error) {
    console.error("Error seeding annual_goals:", error);
    throw error;
  }
}

async function seedMonthGoals(client) {
  try {
    // Create the "month goals" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS month_goals (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        year TEXT NOT NULL,
        month TEXT NOT NULL,
        description TEXT NOT NULL
      );
    `;

    console.log(`Created "month_goals" table`);

    // Insert data into the "month_goals" table
    const insertedMonthGoals = await Promise.all(
      month_goals.map(
        (month_goal) => client.sql`
        INSERT INTO month_goals (id, user_id, year, month, description)
        VALUES (${month_goal.id}, ${month_goal.user_id}, ${month_goal.year}, ${month_goal.month}, ${month_goal.description})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedMonthGoals.length} month_goals`);

    return {
      createTable,
      month_goals: insertedMonthGoals,
    };
  } catch (error) {
    console.error("Error seeding month_goals:", error);
    throw error;
  }
}

async function seedWeekGoals(client) {
  try {
    // Create the "week goals" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS week_goals (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        year TEXT NOT NULL,
        week TEXT NOT NULL,
        description TEXT NOT NULL
      );
    `;

    console.log(`Created "week_goals" table`);

    // Insert data into the "week_goals" table
    const insertedWeekGoals = await Promise.all(
      week_goals.map(
        (week_goal) => client.sql`
        INSERT INTO week_goals (id, user_id, year, week, description)
        VALUES (${week_goal.id}, ${week_goal.user_id}, ${week_goal.year}, ${week_goal.week}, ${week_goal.description})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedWeekGoals.length} week_goals`);

    return {
      createTable,
      week_goals: insertedWeekGoals,
    };
  } catch (error) {
    console.error("Error seeding week_goals:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedTodos(client);
  await seedEvents(client);
  await seedHabits(client);
  await seedConfigs(client);
  await seedDailyTrackings(client);
  await seedDailyTrackingHabits(client);
  await seedConfigHabits(client);
  await seedAnnualGoals(client);
  await seedMonthGoals(client);
  await seedWeekGoals(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
