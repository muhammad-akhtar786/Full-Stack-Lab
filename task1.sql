-- Task 1: PostgreSQL Installation and SQL (task1.sql)

-- 1. Create a database named task1_db
CREATE DATABASE task1_db;

-- Connect to task1_db (in psql, use: \c task1_db)
\c task1_db;

-- 2. Create a table courses
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL,
    credit_hours INTEGER CHECK (credit_hours BETWEEN 1 AND 4)
);

-- 3. Insert at least five valid courses
INSERT INTO courses (code, title, credit_hours) VALUES
    ('CS101', 'Introduction to Computing', 3),
    ('CS201', 'Data Structures and Algorithms', 4),
    ('CS301', 'Full Stack Web Development', 3),
    ('CS302', 'Database Systems', 4),
    ('HUM101', 'English Composition', 2);

-- 4. Test query demonstrating CHECK constraint failure (credit_hours must be between 1 and 4)
-- Uncomment to execute and observe CHECK constraint violation error:
-- INSERT INTO courses (code, title, credit_hours) VALUES ('CS999', 'Invalid Course Hours', 9);

-- 5. Queries:
-- (a) List all courses ordered by title
SELECT * FROM courses
ORDER BY title ASC;

-- (b) List courses with 3 or more credit_hours
SELECT * FROM courses
WHERE credit_hours >= 3;

-- (c) Change the title of one course
UPDATE courses
SET title = 'Advanced Web Technologies'
WHERE code = 'CS301';

-- (d) Delete one course by code
DELETE FROM courses
WHERE code = 'HUM101';

-- (e) Count the courses for each value of credit_hours using GROUP BY
SELECT credit_hours, COUNT(*) AS course_count
FROM courses
GROUP BY credit_hours
ORDER BY credit_hours ASC;
