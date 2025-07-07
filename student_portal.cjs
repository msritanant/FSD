/*QUESTION - 1:
Create a student portal login system using Express.js
Create a /register route to add a student rollNo, name and Password
Use express-session to store the session after successful login from /login
On login, also set a cookie studentPortalAccess with the student's roll number and an expiry of 3 minutes
Use middleware (cookie-parser and express-session) to manage cookies and sessions.*/

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 * 10 }  
}));

const students = {};

app.post('/register', (req, res) => {
  const { rollNo, name, password } = req.body;

  if (!rollNo || !name || !password) {
    return res.status(400).json({ error: 'rollNo, name and password are required' });
  }

  if (students[rollNo]) {
    return res.status(400).json({ error: 'Student already exists' });
  }

  students[rollNo] = { rollNo, name, password };
  res.json({ message: 'Student registered successfully' });
});

app.post('/login', (req, res) => {
  const { rollNo, password } = req.body;

  if (!rollNo || !password) {
    return res.status(400).json({ error: 'rollNo and password are required' });
  }

  const student = students[rollNo];
  if (!student || student.password !== password) {
    return res.status(401).json({ error: 'Invalid rollNo or password' });
  }

  req.session.student = { rollNo: student.rollNo, name: student.name };

  res.cookie('studentPortalAccess', student.rollNo, { maxAge: 3 * 60 * 1000, httpOnly: true });

  res.json({ message: 'Login successful', student: { rollNo: student.rollNo, name: student.name } });
});

app.get('/dashboard', (req, res) => {
  if (!req.session.student) {
    return res.status(401).json({ error: 'Unauthorized, please login' });
  }

  const cookieRollNo = req.cookies.studentPortalAccess;

  if (!cookieRollNo || cookieRollNo !== req.session.student.rollNo) {
    return res.status(401).json({ error: 'Invalid or expired cookie' });
  }

  res.json({ message: `Welcome ${req.session.student.name} to your dashboard!` });
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('studentPortalAccess');
  res.json({ message: 'Logged out successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
