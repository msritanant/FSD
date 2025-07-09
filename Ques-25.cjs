const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8002;

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'sample',
  resave: false,
  saveUninitialized: false
}));

const students = [
//   { roll: '101', password: 'pass123', name: 'Aryan', enrolledCourses: [] },
//   { roll: '102', password: 'secret', name: 'Priya', enrolledCourses: [] }
];

const availablecourses = ['MCA', 'Btech', 'Mtech'];

app.post('/register', (req, res) => {
  const { roll, name, password } = req.body;
  if (students.find(s => s.roll === roll)) {
    return res.status(400).send('Student already registered');
  }
  students.push({ roll, name, password, enrolledCourses: [] });
  res.send('Student registered');
});

app.post('/login', (req, res) => {
  const { roll, password } = req.body;
  const student = students.find(s => s.roll === roll && s.password === password);
  if (!student) {
    return res.status(401).send('Not authorized');
  }
  req.session.student = student;
  res.send('Student logged in');
});

app.get('/courses', (req, res) => {
  if (!req.session.student) {
    return res.status(403).send('Please log in to view courses');
  }
  res.json(availablecourses);
});

app.post('/courses', (req, res) => {
  if (!req.session.student) {
    return res.status(403).send('Please log in to enroll');
  }

  const { courseName } = req.body;
  const student = req.session.student;

  if (!availablecourses.includes(courseName)) {
    return res.status(404).send('Course not found');
  }

  if (student.enrolledCourses.includes(courseName)) {
    return res.status(409).send('Already enrolled in this course');
  }

  student.enrolledCourses.push(courseName);
  res.cookie('LastEnrollmentCourse', courseName, {
    maxAge: 2 * 60 * 1000,
    httpOnly: true
  });

  res.send(`Enrolled in ${courseName}`);
});

app.get('/dashboard', (req, res) => {
  if (!req.session.student) {
    return res.status(403).send('Unauthorized login');
  }
  res.send(`Welcome to your dashboard, ${req.session.student.name}`);
});

app.get('/logout', (req, res) => {
  res.clearCookie('LastEnrollmentCourse');
  req.session.destroy();
  res.send('Logged out and session cleared');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
