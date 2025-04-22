import { pool } from '../src/db/connection';
import fs from 'fs';
import path from 'path';

import { RowDataPacket } from 'mysql2/promise';
import { query } from '../src/db/query';
const groups = [
  { name: 'admin', description: 'Administrators with full access' },
  { name: 'developer',  description: 'Developers with code access' },
  { name: 'staff',  description: 'Staff members with limited access' },
];

(async () => {
  try {
    const connection = await pool.getConnection();
    for (const group of groups) {
        await connection.execute(
            'INSERT INTO `groups` (name, created_at) VALUES (?, NOW())',
            [group.name]
          );
    }
    console.log('✅ Groups seeded successfully.');
    connection.release();
  } catch (error) {
    console.error('❌ Error seeding groups:', error);
  }
})();
