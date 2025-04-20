import { query } from '../db/query';

interface User {
  name: string;
  surname: string;
  birth_date: string;
  sex: 'male' | 'female' | 'other';
}

export async function createUser(user: User) {
  const sql = `
    INSERT INTO users (name, surname, birth_date, sex)
    VALUES (?, ?, ?, ?)
  `;
  const values = [user.name, user.surname, user.birth_date, user.sex];
  return await query(sql, values);
}
