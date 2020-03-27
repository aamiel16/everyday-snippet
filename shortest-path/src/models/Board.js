class Board {
  constructor(size) {
    this.size = size;

    const { nodes, distances } = this.createNodes();
    this.board = this.createBoard();
    this.nodes = nodes;
    this.distObj = distances;
    this.distArr = Object.values(distances);
    this.initial = null;
    this.target = null;
    this.blocks = {};
  }

  createBoard() {
    const board = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      board[i] = [...board].fill('-');
    }
    return board;
  }

  createNodes() {
    const distances = {};
    const nodes = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        distances[`${i},${j}`] = {
          x: i,
          y: j,
          path: [],
          dist: Infinity,
          visited: false,
        };
        nodes.push([i, j]);
      }
    }
    return { nodes, distances }
  }

  getBoard() {
    return this.board;
  }

  getNodes() {
    return this.nodes;
  }

  getElementAt(x, y) {
    return this.board[x][y];
  }

  isCoord(x, y) {
    try {
      return Boolean(this.getElementAt(x, y));
    } catch (e) {
      return false;
    }
  }

  isEqual(n1, n2) {
    const { x: x1, y: y1 } = n1;
    const { x: x2, y: y2 } = n2;
    return Boolean(
      x1 === x2
      && y1 === y2
    );
  }

  markPath(path) {
    for (const [ x, y ] of path) {
      this.board[x][y] = '#';
    }
  }

  markInitial(x, y) {
    this.initial = { x, y };
    this.board[x][y] = 'o';
    return this;
  }

  markTarget(x, y) {
    this.target = { x, y };
    this.board[x][y] = 'x';
    return this;
  }

  markBlock(x, y) {
    const key = `${x},${y}`;
    this.blocks[key] = 1;
    this.board[x][y] = '|';
    return this;
  }

  setDistance(x, y, dist) {
    const key = `${x},${y}`;
    this.distObj[key] = {
      ...this.distObj[key],
      dist,
    };
    this.distArr = Object.values(this.distObj);
  }

  setVisited(x, y, visited) {
    const key = `${x},${y}`;
    this.distObj[key] = {
      ...this.distObj[key],
      visited,
    };
    this.distArr = Object.values(this.distObj);
  }

  setPath(x, y, path) {
    const key = `${x},${y}`;
    this.distObj[key] = {
      ...this.distObj[key],
      path,
    };
    this.distArr = Object.values(this.distObj);
  }

  getDistance(x, y) {
    const key = `${x},${y}`;
    return this.distObj[key].dist;
  }

  getPath(x, y) {
    const key = `${x},${y}`;
    return this.distObj[key].path;
  }

  getVisited(x, y) {
    const key = `${x},${y}`;
    return this.distObj[key].visited;
  }

  getUnvisited() {
    const { blocks } = this;
    return this.distArr.filter(n => !n.visited && !blocks[`${n.x},${n.y}`]);
  }

  getShortestPath() {
    // Set initial distance to 0
    this.setDistance(this.initial.x, this.initial.y, 0);
    return this.compute(this.initial);
  }

  compute(currNode) {
    // Base case
    const { x: tx, y: ty } = this.target;
    if (
      this.getVisited(tx, ty) // Target node has been visited
      || this.getUnvisited().every(n => !isFinite(n.dist)) // All unvisited nodes are unreachable
    ) {
      return this.getPath(tx, ty).splice(1); // Just want to remove the initial node in path (aesthetics)
    }

    // Get next node
    if (!currNode) {
      let currMin = Infinity;
      for (const node of this.getUnvisited()) {
        if (node.dist < currMin) {
          currMin = node.dist;
          currNode = node;
        }
      }
    }

    // Recurse case
    const { x: cx, y: cy } = currNode;
    const neighbors = this.getNeighbors(cx, cy);
    const currDist = this.getDistance(cx, cy);
    const currPath = this.getPath(cx, cy).concat([[cx, cy]]);

    for (const [ x, y ] of neighbors) {
      const neighDist = this.getDistance(x, y);

      if (currDist + 1 < neighDist) {
        this.setPath(x, y, currPath);
        this.setDistance(x, y, currDist + 1);
      }
    }

    // Mark curr node as visited
    this.setVisited(cx, cy, true);

    return this.compute();
  }

  getNeighbors(x, y) {
    const n = [];
    // Left
    if (this.isCoord(x - 1, y)) {
      n.push([x - 1, y]);
    }
    // Right
    if (this.isCoord(x + 1, y)) {
      n.push([x + 1, y]);
    }
    // Top
    if (this.isCoord(x, y + 1)) {
      n.push([x, y + 1]);
    }
    // Bottom
    if (this.isCoord(x, y - 1)) {
      n.push([x, y - 1]);
    }

    return n;
  }
}

module.exports = Board;
