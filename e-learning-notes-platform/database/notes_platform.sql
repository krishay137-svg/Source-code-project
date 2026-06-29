DROP DATABASE IF EXISTS notes_platform;

CREATE DATABASE notes_platform;

USE notes_platform;

CREATE TABLE users(

    id INT AUTO_INCREMENT PRIMARY KEY,

    fullname VARCHAR(100),

    email VARCHAR(100) UNIQUE,

    password VARCHAR(255)

);

CREATE TABLE categories(

    id INT AUTO_INCREMENT PRIMARY KEY,

    category_name VARCHAR(100)

);

INSERT INTO categories(category_name)

VALUES

('Computer Science'),

('Mathematics'),

('Physics'),

('Chemistry'),

('Biology'),

('Electronics'),

('Mechanical'),

('Civil'),

('English'),

('Other');

CREATE TABLE notes(

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    category_id INT,

    title VARCHAR(200),

    description TEXT,

    file_name VARCHAR(255),

    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)

    REFERENCES users(id),

    FOREIGN KEY(category_id)

    REFERENCES categories(id)

);

CREATE TABLE ratings(

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    note_id INT,

    rating INT,

    FOREIGN KEY(user_id)

    REFERENCES users(id),

    FOREIGN KEY(note_id)

    REFERENCES notes(id)

);

CREATE TABLE comments(

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    note_id INT,

    comment TEXT,

    comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)

    REFERENCES users(id),

    FOREIGN KEY(note_id)

    REFERENCES notes(id)

);