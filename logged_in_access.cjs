const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}));

app.get('/login/:name', (req, res) => {
  const studentName = req.params.name;
  req.session.student = {
    name: studentName,
    loggedIn: true
  };
  res.send(`Welcome ${studentName}, you are now logged in!`);
});

function studentAuth(req, res, next) {
  if (req.session.student && req.session.student.loggedIn) {
    next();
  } else {
    res.status(401).send('Access denied: Please login to view results');
  }
}

app.get('/result', studentAuth, (req, res) => {
  const name = req.session.student.name;
  res.send(`Hi ${name}, your results are available!`);
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.clearCookie('connect.sid');
    res.send('You have been logged out.');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
