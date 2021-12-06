const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
name: String,
rating: Number,
review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
name: "Apple",
rating: 7,
review: "Pretty solid as a fruit."
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person =mongoose.model("Person",personSchema);

const person = new Person({
name: "John",
age: 7
});

// person.save();

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "Prett structire."
    });
 const orange = new Fruit({
        name: "Orange",
        rating: 4,
        review: "too sour for me."
        });

 const banana = new Fruit({
            name: "Banana",
            rating: 10,
            review: "nice texture."
            });
            

// Fruit.insertMany([kiwi , orange , banana], function(err){
// if(err){
//     console.log(err);
// }
// else{
//     console.log("Successfully saved all fruits to FruitDB");
// }
// });

Fruit.find(function(err , fruits){
   if(err){
       console.log(err);
   } 
   else{
       mongoose.connection.close();
      console.log(fruits);
      
   }
});