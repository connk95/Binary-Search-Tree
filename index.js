class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(array);
    this.order = [];
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    let mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }

  insert(node = this.root, data) {
    if (node == null) {
      node = new Node(data);
      return node;
    }

    if (data < node.data) {
      node.left = this.insert(node.left, data);
    } else if (data > node.data) {
      node.right = this.insert(node.right, data);
    }

    return node;
  }

  delete(node = this.root, data) {
    if (node == null) {
      return this.root;
    }

    if (data < node.data) {
      node.left = this.delete(node.left, data);
    } else if (data > node.data) {
      node.right = this.delete(node.right, data);
    } else {
      if (node.left == null) {
        return node.right;
      } else if (node.right == null) {
        return node.left;
      }
      //   node.data = minValue(node.right);
      node.right = this.delete(node.right, root.data);
    }
    return node;
  }

  find(node = this.root, data) {
    if (node == null) {
      return null;
    } else if (data < node.data) {
      return this.find(node.left, data);
    } else if (data > node.data) {
      return this.find(node.right, data);
    } else {
      return node;
    }
  }

  toArray(arr, value) {
    arr.push(value);
  }

  levelOrder() {
    let queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let node = queue.shift();
      this.order.push(node.data);
      if (node.left != null) {
        queue.push(node.left);
      }
      if (node.right != null) {
        queue.push(node.right);
      }
    }
  }

  preorder(node = this.root) {
    if (node == null) {
      return;
    }
    this.toArray(this.order, node.data);
    this.preorder(node.left);
    this.preorder(node.right);
  }

  postorder(node = this.root) {
    if (node == null) {
      return;
    }
    this.postorder(node.left);
    this.postorder(node.right);
    this.toArray(this.order, node.data);
  }

  inorder(node = this.root) {
    if (node == null) {
      return;
    }
    this.inorder(node.left);
    this.toArray(this.order, node.data);
    this.inorder(node.right);
  }

  height(node) {
    if (node == null) {
      return 0;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node = this.root, data) {
    if (node.data == data.data) {
      return 0;
    }
    if (node.data > data.data) {
      return this.depth(node.left, data) + 1;
    }
    if (node.data < data.data) {
      return this.depth(node.right, data) + 1;
    }
  }

  isBalanced(node = this.root) {
    if (node == null) {
      return 0;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    if (leftHeight - rightHeight < 1 || rightHeight - leftHeight < 1) {
      return "true";
    } else {
      return "false";
    }
  }

  rebalance() {
    this.inorder(this.root);
    this.root = this.buildTree(this.order);
  }
}

const uniqueSort = (array) => {
  let uniqueArray = [...new Set(array)];
  let sortedArray = uniqueArray.sort((a, b) => a - b);
  return sortedArray;
};

const createArray = (maxValue, maxLength) => {
  let randomArray = [];
  for (i = 0; i < maxLength; i++) {
    let newInt = Math.floor(Math.random() * maxValue) + 1;
    randomArray.push(newInt);
  }
  return randomArray;
};

const bst = new Tree(createArray(100, 15));

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(bst.root);
