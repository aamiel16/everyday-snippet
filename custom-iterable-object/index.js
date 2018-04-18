// A custom iterable object
// In order for an object to be iterable, it must implement the @@iteration method.
// The @@iterator key is available using the constant Symbol.iterator

// Lets say we want to iterate over this defined object
// The object just contains some of the greatest minds categorized by their subject of expertise
// Suppose we would want to iterate into this object, and just print out every name from all categories
const obj = {
  greatestMinds: {
    mathematics: [
      'Pythagoras',
      'Euclid',
      'Pierre de Fermat'
    ],
    computerScience: [
      'Alan Turing',
      'James Gosling',
      'Sergey Brin'
    ],
    physics: [
      'Albert Einstein',
      'Stephen Hawking',
      'Isaac Newton Sr.'
    ]
  },

  // One way of doing it is by implementing our own iterator for this object
  // An object is only considered an iterator if it implements a next() method that follows the iterator protocol:
  // - The next method must be a zero arguments function
  // - The next method must return an object with two properties: done (boolean), and value (JS value).
  [Symbol.iterator]() { // @@iterator
    const subjects = Object.values(this.greatestMinds); // Gets an array of array of names (i.e. [[...], [...], [...]])

    // Counters
    let currSubjectIdx = 0;
    let currNameIdx = 0;

    return {
      next() {
        const names = subjects[currSubjectIdx]; // An array of names for a given subject

        // All names for this array has been exhausted
        if (currNameIdx > names.length - 1) {
          currSubjectIdx++; // Move to the next subject
          currNameIdx = 0; // Reset the name index
        }

        // We have passed through all the subjects, hence must stop
        if (currSubjectIdx > subjects.length - 1) {
          return {
            value: undefined,
            done: true
          };
        }

        // There is still some subjects/names that we haven't exhausted
        return {
          value: subjects[currSubjectIdx][currNameIdx++],
          done: false
        }
      }
    }
  }
}

// After implementing this custom iterator for the object, we now use a simple for-of loop to show all the names
for (let name of obj) {
  console.log('Name: ', name); //
}

