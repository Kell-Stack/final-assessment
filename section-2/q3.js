// Part 1:
// Represent the binary search tree above in code.

// Do this by making a Node class. Each node should have a value, a left child, and a right child.
//Value is a number and left child and right child are other Node objects.

// Create the given example tree in code using your Node class. Note: You DO NOT need to write an
//algorithm to create binary search trees -- you just need to set up this particular tree with every node
//having the correct left and right children.

// Here’s some sample code to get you started. You don't need to use this code but you can if you want.
let root = 4
let node1 = new Node(4, 2, 8);
let node2 = new Node(2, 0, 3)
let node3 = new Node(8, 6, 9)

class Node {
	constructor(value, left_child, right_child) {
        let currentNode = node1


        while (currentNode.next) {
            if (node2.value < currentNode.value ) {
                return currentNode.push.(left_child)
            } else if (node2.value > currentNode.value ){
                return currentNode.push(right_child)
            }
        return new Node == currentNode
        }

        while (currentNode.next){
            if (node3.value > currentNode.value){
                return currentNode.push(node2.left_child)
            } else if (node3.value > currentNode.value) {
                return currentNode.push(left_child)
            }
        return new Node == currentNode
        }

	}
}

//So i know this doesn't makes no sense and is not syntactically correct
//but what I want to happen is have a pointer point to a root node and say
//for the new node, if it is less than the root than push it into the left new node
//and if it is greater than the root push it into the right new node, then move the pointer
//to the roots left child node and give it two new values and if it's less than push it into the
//left new node and if it's greater than push it into the right new node.


///////////////////////////////////////////////////////////////////////////////////////////
// Part 2:
// Write a function that takes as inputs the root node of a tree, and returns the smallest value in the tree.
// Hint: The left child of a node is always smaller than it, so you can find the smallest node in the tree by starting at the root node, going to its left child, then going to that node’s left child, etc, etc.
// Note: Your code should work for a tree of any size, not just the tree shown in the example.
// Example:
// Input: Root node from part 1
// Returns: 0
// Save the following code and text in the same file :
// Write the function
// If you’re not able to code the function, describe in words the algorithm you would use (be as specific as possible)
// What is the runtime of this function? Briefly explain why.
// Unit tests: What are some inputs you would test to make sure this function works? Please give specific example inputs.

let node1 = new Node(4, 2, 8);
let node2 = new Node(2, 0, 3)
let node3 = new Node(8, 6, 9)

function nodeOfTree(){
    return
}

//I'm not sure how to write this without Google help so ideally you would point at the root tree and follow
//to it's left child. This becomes the new current node / pointer. from the new pointer you would know that you
//want the value from the left as it's less than the currentNode, and you know that thant's less than the root node
//You would return that value ince there are only three levels in this binary tree you've reached the smallest
//valued node which in the example tree is(0). The run time of this would be O(n^2) because I'd be asking each element
//about another element about another so it'd take a little bit of time. I think worse case this would be O(2^n)

/////////////////////////////////////////////////////////////////////////////////////////////

// Part 3:
// Write a function that takes as inputs the root node of a tree and a target number, and returns whether the target number is in the tree. Note: Your code should work for a tree of any size, not just the tree shown in the example.
// Example 1:
// (Input) Root node: Root node from part 1
// (Input) Target number: 6
// Returns: True (6 is the value of one of the nodes in the tree)
// Example 2:
// (Input) Root node: Root node from part 1,
// (Input) Target number: 5
// Returns: False (There is no node with value 5 in the tree)
// Save the following code and text in the same file:
// Include this comment above your answer: // Part 3
// Write the function
// If you’re not able to code the function, describe in words the algorithm you would use (be as specific as possible)
// What is the runtime of this function? Briefly explain why.
// Unit tests: What are some inputs you would test to make sure this function works? Please give specific example inputs.

function nodeFunc (rootNode,target){
    let currentNode = rootNode;
    let newNode = new Node (target)

    while (currentNode.next) {
        if (currentNode<target< newNode){
            return true
        } else {
            return false
        }
    }
}

//I realize this too doesn't syntactically make sense but the idea is you start at a root and
//take that value and run it against the target value until there aren't any nodes left it will
//return if the target value is between the least value and the greatest value as it travels down
//the tree. If the target isn't beetween the most left node and the root or the mos right node
// and the root, the function would return false.