const { db } = require("@vercel/postgres");
const {
  users,
  todos,
  events,
  habits,
} = require("../src/app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
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
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
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
        user_id UUID NOT NULL,
        active_month DATE NOT NULL, 
        active BOOLEAN NOT NULL, 
        dates_completed DATE[] NOT NULL
      );
    `;

    console.log(`Created "habits" table`);

    // Insert data into the "habits" table
    const insertedHabits = await Promise.all(
      habits.map(
        (habit) => client.sql`
        INSERT INTO habits (id, description, user_id, active, active_month, dates_completed)
        VALUES (${habit.id}, ${habit.description}, ${habit.user_id}, ${habit.active}, ${habit.active_month}, ${habit.dates_completed})
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

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedTodos(client);
  await seedEvents(client);
  await seedHabits(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
