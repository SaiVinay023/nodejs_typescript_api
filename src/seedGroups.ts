import { pool } from './db/connection';

const groups = [
  { name: 'admin', description: 'Administrators with full access' },
  { name: 'developer', description: 'Developers with code access' },
  { name: 'staff', description: 'Staff members with limited access' },
];

(async () => {
  try {
    const connection = await pool.getConnection();

    for (const group of groups) {
      await connection.execute(
        'INSERT INTO `groups` (name, description, created_at) VALUES (?, ?, NOW())',
        [group.name, group.description]
      );
    }

    console.log('✅ Groups seeded successfully.');
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding groups:', error);
    process.exit(1);
  }
})();
