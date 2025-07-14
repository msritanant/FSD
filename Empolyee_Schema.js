const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/employeeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log('MongoDB Connected');
}).catch(err =>{
    console.error('MongoDB connection error: ', err);
});

const employeeSchema = new mongoose.Schema({
    empId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    department: String,
    designation: String,
    salary: Number
});


const Empolyee = mongoose.model('Empolyee', employeeSchema);

app.post('/add', async(req, res) =>{
    try
    {
        const newEmpolyee = new Empolyee(req.body);
        const result = await newEmpolyee.save();
        res.json({message: 'Empolyee', result})
    }
    catch(error)
    {
        res.status(500).json({ error });
    }
});

app.get('/employees', async (req, res) =>{
    try
    {
        const employees = await Empolyee.find();
        res.json(employees);
    }
    catch(error)
    {
        res.status(500).json({ error });
    }
});

app.get('/Empolyee/:empId', async (req, res) =>{
    try
    {
        const Empolyee = await Empolyee.findOne({ empId: req.params.empId});
        res.json(Empolyee);
    }
    catch(error)
    {
        res.status(500).json({ error });
    }
});

app.put('/update/:empId', async (req, res) =>{
    try
    {
        const updated = await Empolyee.findOneAndUpdate(
            {
                empId: req.params.empId
            },
            req.body,
            {
                new: true
            }
        );

        res.json({ message: 'Empolyee Updated', updated});
    }
    catch(error)
    {
        res.status(500).json({ error });
    }
});

app.delete('/delete/:empId', async(req, res) =>{
    try
    {
        const deleted = await Empolyee.findOneAndDelete({ empId: req.params.empId});
        res.json({ message: 'Empolyee deleted', deleted});
    }
    catch(error)
    {
        res.status(500).json({ error });
    }
});

app.listen(3000, () =>{
    console.log("http://localhost:3000");
})