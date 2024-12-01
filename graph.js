class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function traverse(vertex) {
      // If no vertex is found, return null
      if (!vertex) return null;
      // visit the node: add the current node to 'visited' and add its value to 'result'
      visited.add(vertex);
      result.push(vertex.value);
      // visit each neighbor: if the neighbor hasn't been visited, revursively call traverse on the neighbor
      for (let neighbor of vertex.adjacent) {
        if (!visited.has(neighbor)) {
          traverse(neighbor);
        }
      }
    }
    traverse(start);

    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    // create a queue (array) and place the starting vertex in it
    const queue = [start];
    const result = [];
    const visited = new Set();
    // variable to keep track of the current vertex
    let currentVertex;

    // add the starting vertex to the visited set
    visited.add(start);
    // while there is still something in the queue
    while (queue.length) {
      // remove the first vertex from the queue and push it into the result array
      currentVertex = queue.shift();
      result.push(currentVertex.value);
      // loop over each adjacent vertex in the adjacency list of the current vertex
      for (let neighbor of currentVertex.adjacent) {
        // if the neighbor has not been visited
        if (!visited.has(neighbor)) {
          // add it to the visited set
          visited.add(neighbor);
          // push it into the queue
          queue.push(neighbor);
        }
      }
    }
    return result;
  }

  // Write a function which accepts a graph, a source vertex and target vertex and returns the shortest path. You can assume your graph is unweighted and undirected.
  shortestPath(start, target) {
    const queue = [start];
    const visited = new Set();
    // object to keep track of the parent of each vertex, which helps reconstruct the path
    const parent = {};
    // array to store the shortest path
    let path = [];
    let currentVertex;

    // Mark 'start' node as visited
    visited.add(start);

    // While there is still something in the queue
    while (queue.length) {
      // Dequeue the first element from the queue and set it to the current vertex
      currentVertex = queue.shift();

      // If the current vertex is the target, recontruct the path by following the parent pointers from the target back to the start. Reverse the path to get the correct order from start to target
      if (currentVertex === target) {
        while (currentVertex !== start) {
          path.push(currentVertex);
          currentVertex = parent[currentVertex];
        }
        path.push(start);
        return path.reverse();
      }

      // For each neighbor of the current vertex, if the neighbor hasn't been visited, add it to the visited set, set its parent to the current vertex, and enqueue it
      for (let neighbor of currentVertex.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          parent[neighbor] = currentVertex;
          queue.push(neighbor);
        }
      }
    }
  }
}

module.exports = { Graph, Node };
