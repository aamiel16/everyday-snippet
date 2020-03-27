const Board = require('./models/Board');
const b = new Board(5);

const path = b
  .markInitial(0, 0)
  .markTarget(4, 4)
  .markBlock(0, 2)
  // .markBlock(1, 2)
  .markBlock(2, 2)
  .markBlock(3, 2)
  .markBlock(4, 2)
  .getShortestPath();

b.markPath(path);

console.log('Board: ', b.board);
console.log('Shortest path: ', path);

