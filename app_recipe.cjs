// app.js
const express = require('express');
const path = require('path');
const app = express();

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets from /assets virtual path
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Sample recipe data
const recipe = {
  name: "Spaghetti Carbonara",
  ingredients: [
    "200g spaghetti",
    "100g pancetta",
    "2 large eggs",
    "50g pecorino cheese",
    "50g parmesan",
    "Freshly ground black pepper",
    "Salt"
  ],
  steps: [
    "Boil the pasta in salted water until al dente.",
    "Fry the pancetta until crispy.",
    "Beat the eggs with the cheese and pepper.",
    "Drain the pasta and mix quickly with the pancetta and egg mixture.",
    "Serve immediately with extra cheese."
  ],
  image: "/assets/carbonara.jpg"
};

app.get('/', (req, res) => {
  res.render('recipe', { recipe });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
