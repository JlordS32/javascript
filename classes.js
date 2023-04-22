
// Declaring a class in javascript.

class Person {
    constructor(firstName, lastName) {
        this.first = firstName;
        this.last = lastName;
        this.fullname = firstName + ' ' + lastName;
    }

    getFullName() {
        return this.first + ' ' + this.last;
    }
}

const person = new Person('John', 'Doe');

// OUTPUT SECTION

console.log(person); // output: Person { first: 'John', last: 'Doe', fullname: 'John Doe' }
console.log(person.fullname); // output: John Doe
console.log(person.getFullName()); // output: John Doe