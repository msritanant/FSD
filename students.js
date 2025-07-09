import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let students = [
    {"id":1, "name": "Abhishek", "course": "MCA"},
    {"id":2, "name": "Rajesh", "course": "BCA"},
    {"id":3, "name": "Harry", "course": "BTech"}
];

app.get('/students', (req, res) =>{
    res.send(students);
});

app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).send('Student not found');
  }

  res.send(JSON.stringify(student));
});

app.post('/students', (req, res) =>{
    const {name, course} = req.body;
    const newStudent = {
        id:students.length + 1,
        name,
        course
    };

    students.push(newStudent);
    res.status(201).send(`student added: ${JSON.stringify(newStudent)}`);
});

app.put('/students/:id', (req, res) =>{
    const studentId = parseInt(req.params.id);
    const {name, course} = req.body;
    const student = students.find(b => b.id === studentId);

    if(!student)
    {
        return res.status(404).send('student not found');
    }

    student.name = name || student.name;
    student.course = course || student.course;

    res.send(`student details updated: ${JSON.stringify(student)}`);
});

app.delete('/students/:id', (req, res) =>{
    const studentId = parseInt(req.params.id);
    const index = students.findIndex( s => s.id === studentId);

    if(index === -1)
    {
        return res.status(404).send('student not found');
    }

    const deletedStudent = students.splice(index, 1);
    res.send(`student deleted: ${JSON.stringify(deletedStudent[0])}`);
});

app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`);
});