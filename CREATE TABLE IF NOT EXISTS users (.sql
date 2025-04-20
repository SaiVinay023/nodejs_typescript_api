CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  sex ENUM('male', 'female', 'other') NOT NULL
);
