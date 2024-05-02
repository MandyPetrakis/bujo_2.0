const { db } = require("@vercel/postgres");
const {
  users,
  todos,
  events,
  habits,
  configs,
  daily_sleeps,
  daily_habits,
  config_habits,
  annual_goals,
  month_goals,
  week_goals,
  daily_hydrations,
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
        start_date DATE NOT NULL,
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

async function seedDailySleeps(client) {
  try {
    // Create the "daily sleeps" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS daily_sleeps (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        date DATE NOT NULL,
        bedtime TEXT NOT NULL,
        waketime TEXT NOT NULL
      );
    `;

    console.log(`Created "daily_sleeps" table`);

    // Insert data into the "daily_sleeps" table
    const insertedDailySleeps = await Promise.all(
      daily_sleeps.map(
        (daily_sleep) => client.sql`
        INSERT INTO daily_sleeps (id, user_id, date, bedtime, waketime)
        VALUES (${daily_sleep.id}, ${daily_sleep.user_id}, ${daily_sleep.date},  ${daily_sleep.bedtime}, ${daily_sleep.waketime})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedDailySleeps.length} daily_sleeps`);

    return {
      createTable,
      daily_sleeps: insertedDailySleeps,
    };
  } catch (error) {
    console.error("Error seeding daily_sleeps:", error);
    throw error;
  }
}

async function seedDailyHydrations(client) {
  try {
    // Create the "daily hydrations" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS daily_hydrations (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        date DATE NOT NULL,
        hydrations TEXT NOT NULL
      );
    `;

    console.log(`Created "daily_hydrations" table`);

    // Insert data into the "daily_hydrations" table
    const insertedDailyHydrations = await Promise.all(
      daily_hydrations.map(
        (daily_hydration) => client.sql`
        INSERT INTO daily_hydrations (id, user_id, date, hydrations)
        VALUES (${daily_hydration.id}, ${daily_hydration.user_id}, ${daily_hydration.date}, ${daily_hydration.hydration})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedDailyHydrations.length} daily_hydrations`);

    return {
      createTable,
      daily_hydrations: insertedDailyHydrations,
    };
  } catch (error) {
    console.error("Error seeding daily_hydrations:", error);
    throw error;
  }
}

async function seedDailyHabits(client) {
  try {
    // Create the "daily trackings habits" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS daily_habits (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        habit_id UUID NOT NULL,
        date DATE NOT NULL,
        completed BOOLEAN NOT NULL
      );
    `;

    console.log(`Created "daily_habits" table`);

    // Insert data into the "daily_trackings_habits" table
    const insertedDailyTrackingsHabits = await Promise.all(
      daily_habits.map(
        (daily_habit) => client.sql`
        INSERT INTO daily_habits (id, habit_id, date, completed)
        VALUES (${daily_habit.id}, ${daily_habit.habit_id}, ${daily_habit.date}, ${daily_habit.completed})
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
  await seedDailyHabits(client);
  await seedConfigHabits(client);
  await seedAnnualGoals(client);
  await seedMonthGoals(client);
  await seedWeekGoals(client);
  await seedDailyHydrations(client);
  await seedDailySleeps(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
