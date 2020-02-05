drawSpiral(makeSpiral(4));


function makeSpiral(n) {
  const spiral = [];
  const space = '   ';
  const fill = ' x '

  // Initialize array
  for (let i = 0; i < n; i++) {
    const row = (new Array(n)).fill(space);
    spiral.push(row);
  }

  // Build spiral
  let len = n;
  let c = { x: 0, y: 0 };

  while (len >= n/2) {  
    // Draw top to right
    for (let i = c.x; i < len; i++) {
      spiral[c.y][i] = fill;
      c.x = i;
    }

    // Draw right to bottom
    for (let i = c.y; i < len; i++) {
      spiral[i][c.x] = fill;
      c.y = i;
    }

    // Draw bottom to left
    for (let i = c.x; i >= n - len; i--) {
      spiral[c.y][i] = fill;
      c.x = i;
    }

    // Draw left to top - 1
    for (let i = c.y; i > n - len + 1; i--) {
      spiral[i][c.x] = fill;
      c.y = i;
    }

    // Update len
    len -= 2;
  }

  return spiral;
}


function drawSpiral(spiral) {
  for (const row of spiral) {
    console.log(row.join(''));
  }
}
