const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Emily', 'Frank', 'Grace', 'Henry', 'Isabelle', 'Jack', 'Barlie'];


// 1. Foreach method

firstNames.forEach((item, index, array) => {
    // console.log(item, index, array);
})

// 2. Map method

const newNames = firstNames.map((name) => {
    return name.toUpperCase();
})

newNames.forEach((item) => {
    // console.log(item);
})

// 3. Filter method

const filteredNames = firstNames.filter((name) => {
    return name.includes('lie');
});

const filteredNames_2 = firstNames.filter((name) => name.includes('lie'));

console.log(filteredNames);

const numbers = [1, 2, 3, 4, 5, 6];

// Attempting to recreate filter method.
const test = ((array) => {
    const newArray = new Array();
    array.forEach((item) => {
        if (item % 2 === 0){
            newArray.push(item);
        }
    })

    return newArray;
})

// Second attempt to recreate filter method
const filter_myver = ((array) => {
    if (!Array.isArray(array)) return 'not an array';

    const arr = new Array();

    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) {
            arr.push(array[i]);
        }
    }

    return arr;
});

// console.log(filter_myver(numbers)); // Output: [2, 4, 6]

//console.log(filteredNames_2);