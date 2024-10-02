// const mysql = require('mysql2');
const mysql = require('mysql');
// require('dotenv').config();

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cs-tutor'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL
    )
  `;

  const topicTable = `
    CREATE TABLE IF NOT EXISTS Topic (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT
    );
  `;

  const subtopicTable = `
    CREATE TABLE IF NOT EXISTS Subtopic (
      id INT AUTO_INCREMENT PRIMARY KEY,
      topic_id INT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      FOREIGN KEY (topic_id) REFERENCES Topic(id)
    );
  `;

  const lessonTable = `
    CREATE TABLE IF NOT EXISTS Lesson (
      id INT AUTO_INCREMENT PRIMARY KEY,
      subtopic_id INT,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      examples TEXT,
      diagrams TEXT,
      FOREIGN KEY (subtopic_id) REFERENCES Subtopic(id)
    );
  `;

  const quizTable = `
    CREATE TABLE IF NOT EXISTS Quiz (
      id INT AUTO_INCREMENT PRIMARY KEY,
      subtopic_id INT,
      title VARCHAR(255) NOT NULL,
      FOREIGN KEY (subtopic_id) REFERENCES Subtopic(id)
    );
  `;

  const questionTable = `
    CREATE TABLE IF NOT EXISTS Question (
      id INT AUTO_INCREMENT PRIMARY KEY,
      quiz_id INT,
      question TEXT NOT NULL,
      answer_options TEXT,
      correct_answer INT,
      FOREIGN KEY (quiz_id) REFERENCES Quiz(id)
    );
  `;

  connection.query(createUsersTable, (err, results) => {
    if (err) {
      console.error('Error creating users table:', err);
      return;
    }
    console.log('Users table created or already exists');
  });

  connection.query(topicTable, (err, result) => {
    if (err) throw err;
    console.log('Topic table created or already exists');
  });

  connection.query(subtopicTable, (err, result) => {
    if (err) throw err;
    console.log('Subtopic table created or already exists');
  });

  connection.query(lessonTable, (err, result) => {
    if (err) throw err;
    console.log('Lesson table created or already exists');
  });

  connection.query(quizTable, (err, result) => {
    if (err) throw err;
    console.log('Quiz table  or already exists');
  });

  connection.query(questionTable, (err, result) => {
    if (err) throw err;
    console.log('Question table created or already exists');
  });
});

module.exports = connection;
