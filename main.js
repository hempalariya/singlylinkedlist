/*------------------------------linked lists-------------------------------------------*/
//1-- singly linked lists
// a data structure that contains a head, tail and lenght property
// linked lists consist of nodes, and each node has a value and a pointer to another node ro null.
// ** there is no index
// the terminolgy singly linked list comes from the fact that each node is only connected one directionally to the next node.

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// let first = new Node("hi")
// first.next = new Node("there")
// first.next.next = new Node("how")
// first.next.next.next = new Node("are")
// first.next.next.next.next = new Node("you")

class singlyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /*1--**push method to add a node at the end of the list */
  // pushing pseudo code
  //this function should accept a value
  //create a new node using the value passed to the function
  //if there is no head property on the list, set the head and tail to be the newly created node.
  // otherwise set the next property on the tail to be the new mode and set the tail property on the list to be the newly created node
  //increment the length of the list by one
  //return

  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  /*2--**pop method to remove a node from the end of the list */
  // removing a node from the tail means assign a new tail, for this we have to go through the complete list to the end of it. (as we can not move back in singly linked list. i.e. we don't have backward pointer.)

  //popping pseudocode
  //if there are no nodes in the list, return undefined
  //loop through the list until you reach the tail
  //set the next property of the 2nd to last node to be null
  //set the tail to be the 2nd to the last node
  //decrement the length of the list by 1
  //Return the value of the node removed

  //----*****----***** to traverse through the list (one way to do so)
  //   traverse(){
  //     let current = this.head
  //     while(current){
  //         console.log(current.val)
  //         current = current.next
  //     }
  //   }

  // *** finally pop method
  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  // *-3 **shifting
  // removing a node from the beginning of the linked list.

  //pseudo code
  //- if there is no nodes, return undefined
  //- store the current head property in a variable
  //- set the head property to be the current head's next property
  //- decrement the length by 1
  //- return the value of the node removed

  shift() {
    if (!this.head) return undefined;

    let currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return currentHead;
  }

  // *-3- ** unshifting
  //add a node to the beginning of the linked list

  //pseudo code
  //- this function should accept a value
  //- create a new node using the value passed to the fuction.
  //- if there is no head property on the list, set the head and tail to be the newly create node.
  //- otherwise set the newly created node's next property to be the current head property on the list
  //- set the head property no the list to be that new created node
  //- increment the length by 1
  //- return the linked list

  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  // *-4 ** Get
  // Retrieving a node by it's position in the linked list

  // pseudo code
  // this function should accept and index
  // if the index is less than zero or greater than or equal to the length of the list, return null
  // loop through the list until you reach the index and return the node at that specific index

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let currentIndex = 0;
    let currentNode = this.head;
    while (currentIndex !== index) {
      currentNode = currentNode.next;
      currentIndex++;
    }
    return currentNode;
  }

  // *-5 ** Set
  // Changing the vlaue of a node based on it's position in the Linked List

  //pseudo code
  //this function should accept an index and a value
  //Use get function to find the specific node
  //If the not is not found, return false
  //If the node is found, set the value of that node to be the value to the function and return true

  set(index, val) {
    let node = this.get(index);
    if (node === null) return false;

    node.val = val;

    return true;
  }

  // *-5 ** Insert
  // Adding a node to the Linked List at a specific position

  //pseudo code
  //If the index is less than zero or greater than the length, return false
  //If the index is same as the length, push a new node to the end of the list
  //If the index is zero, unshift a new node to the start of the list
  //Otherwise, using the get method, access the node at the index - 1
  //Set next property  on that node to be the new node
  //Set the next property on the new node to be the previous next
  //Increment the length
  //Return true

  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    let newNode = new Node(val);
    if (index === 0) {
      this.unshift(val);
    } else if (index === this.length) {
      this.push(val);
    } else {
      let pre = this.get(index - 1);
      newNode.next = pre.next;
      pre.next = newNode;
      this.length++;
    }
    return true;
  }

  // *-6 ** Remove
  // Removing a node from the Linked List at a specific position

  //pseudo code
  //this funciton should accept an idex
  //If the index is less than 0 or greater than the length, return unfefined
  //If the index is the same as the length - 1, pop the node at last
  //If the index is 0, shift
  //Otherwise, using the get method, access the node at the index - 1
  //Set the next property on that node to be the next of the next node
  //Decrement the length
  //Return the vlaue of the node removed

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === this.length - 1) return this.pop();
    if (index === 0) return this.shift();
    const pre = this.get(index - 1);
    const removed = pre.next;
    pre.next = removed.next;
    this.length--;
    return removed;
  }

  // *6- ** Reverse
  //Reversing the Linked List in place

  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next
    }
    return this
  }
}

let list = new singlyLinkedList();

list.push("hi");
list.push("there");
list.push("!");
