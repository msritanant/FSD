const fs = require('fs');
const { constrainedMemory } = require('process');

const readable = fs.createReadStream('data.txt', {encoding: 'utf8'});
readable.on('data', (chunk) =>{
    console.log("Received chunk", chunk);
});

readable.on('end', ()=>{
    console.log("Finished reading data.txt");
});