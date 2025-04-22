import { pool } from './db/connection';

async function dropTables() {
  try {
    // SQL queries to drop the tables if they exist
    const dropGroupsTableQuery = `DROP TABLE IF EXISTS groups;`;
    const dropUserGroupsTableQuery = `DROP TABLE IF EXISTS user_groups;`;

    // Execute the queries
    await pool.execute(dropGroupsTableQuery);
    await pool.execute(dropUserGroupsTableQuery);

    console.log('Tables dropped successfully');
  } catch (err) {
    console.error('Error dropping tables:', err);
  }
}

// Call the function to drop the tables
dropTables();
