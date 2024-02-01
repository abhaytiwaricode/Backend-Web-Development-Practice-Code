// function personMaker(name, age) {
//   const person = {
//     name: name,
//     age: age,
//     talk() {
//       console.log(`Hii, my name is ${this.name}`);
//     }
//   };
//   return person;
// };

// Constructors - dosen't return anything
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// Person.prototype.talk = function() {
//   console.log(`Hii, my name is ${this.name}`);
// };

// class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  talk() {
    console.log(`Hii, my name is ${this.name}`);
  }
}

// Class
class Student extends Person {
  constructor(name, age, marks) {
    super(name, age);
    this.marks = marks;
  }
}

class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }
}

let s1 = new Student('abhay', 19, 95);
