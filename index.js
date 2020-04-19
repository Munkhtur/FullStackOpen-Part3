const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

let persons = [
  {
    name: 'Arto Hellas',
    number: '39-44-5323523',
    id: 1,
  },
  {
    name: 'John',
    number: '39-44-532',
    id: 2,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 3,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 4,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 5,
  },
  {
    name: 'John Poppendieck',
    number: '39-23-6423122',
    id: 6,
  },
];
app.use(cors());
app.use(express.json());
morgan.token('body', function (req) {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status - :response-time ms - :body'));
app.use(express.static('build'));

app.get('/info', (req, res) => {
  let date = new Date();
  res.send(
    `<p>The phonebook has info for ${persons.length} people</p><p>${date}</p>`
  );
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  console.log(person);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing',
    });
  }
  if (
    persons.find(
      (p) => p.name.toLocaleLowerCase() === body.name.toLocaleLowerCase()
    )
  ) {
    return res.status(400).json({
      error: 'Name already exists',
    });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000),
  };
  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
