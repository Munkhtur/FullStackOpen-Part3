const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://turu123:${password}@cluster0-vadct.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model('Person', phoneBookSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then((res) => {
  console.log(`added ${res.name} number ${res.number} to phonebook`);
  mongoose.connection.close();
});

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});
