require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const { Schema } = mongoose;

const PersonSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', PersonSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Xuwei Li',
    age: 35,
    favoriteFoods: ['Coca-Cola', 'Shrimp Dumplings']
  });
  person.save(done);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, done);
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  }, done)
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  }, done);
};

const findPersonById = (personId, done) => {
  Person.findOne({
    _id: personId
  }, done);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findOne({
    _id: personId
  }, (err, data) => {
    if (err) done(err);
    data.favoriteFoods.push(foodToAdd);
    data.markModified('favoriteFoods');
    data.save(done);
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({
    name: personName
  }, {
    $set: {
      age: ageToSet
    }
  }, {
    new: true
  }, done);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, done);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({
    name: nameToRemove
  }, done);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({
    favoriteFoods: foodToSearch
  })
  .sort('name')
  .limit(2)
  .select(['name', 'favoriteFoods'])
  .exec(done);

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
