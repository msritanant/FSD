//Write a pgm to write "Welcome to Node.js"inyo a file named welcome.txt
//Read the content of welcome.txt and log it usign a callback

const fs = require('fs');

// Write "Welcome to Node.js" to welcome.txt
fs.writeFile('welcome.txt', 'Welcome to Node.js', (writeErr) => {
  if (writeErr) {
    return console.error('Error writing file:', writeErr);
  }

  console.log('File written successfully.');

  // Read the content of welcome.txt
  fs.readFile('welcome.txt', 'utf8', (readErr, data) => {
    if (readErr) {
      return console.error('Error reading file:', readErr);
    }
    
    console.log('File content:', data);
  });
});
