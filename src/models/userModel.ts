import { query } from '../db/query';

interface User {
    id: number;
  name: string;
  surname: string;
  birth_date: string;
  sex: 'male' | 'female' | 'other';
}

export async function createUser(user: User) {
  const sql = `
    INSERT INTO users (id, name, surname, birth_date, sex)
    VALUES (?, ?, ?, ?)
  `;
  const values = [user.id, user.name, user.surname, user.birth_date, user.sex];
  return await query(sql, values);
}
