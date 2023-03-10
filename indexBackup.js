//! Very similar to guess the number
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// ! run file in terminal with: node fileName.js
// ! DO NOT TOUCH CODE ABOVE THIS LINE


let whichRoom = [];
let playerInventory = []; // player starts with empty array

class ClassInventory { // makes objects 
      constructor(name, location) {
          this.name = name;
          this.loc = location;
      }
}
let chestKey = new ClassInventory();
chestKey.name = "Chest Key";
chestKey.loc = "Garden";
let sword = new ClassInventory();
sword.name = "Sword";
sword.loc = "Barracks";
let gold = new ClassInventory();
gold.name = "Gold";
gold.loc = "Treasury";
//console.log(gold); //test to see if class applies correctly

class ClassRoom { // makes objects 
      constructor(name, desc) {
          this.name = name;
          this.description = desc;
      }
}
let treasury = new ClassRoom();
treasury.name = "Treasury";
treasury.desc = "Treasury desc";
let garden = new ClassRoom();
garden.name = "Garden";
garden.desc = "Garden desc";
let barracks = new ClassRoom();
barracks.name = "Barracks";
barracks.desc = "Barracks desc";
let hall = new ClassRoom();
hall.name = "Hall";
hall.desc = "Hall desc";
//console.log(treasury); //test to see if class applies correctly


// let Persepolis = {
//   mountain: "Mountain of Mercy",
//   builder: "Darius",
//   desc: "Palace",
//   rooms: [
//     {name: "Garden", inventory: "key", desc: "garden disc"}, // key to treasury
//     {name: "Treasury", inventory: ["Gold", "Jewels"], desc: "treasury disc"},
//     {name: "Hall", inventory: "", desc: "A central room with three doors."},
//     {name: "Barracks", inventory: ["sword", "shield", "helmet"], desc: ""}
//   ]
// }
let state = { // state machine template from lecture
  "Hall": ["Barracks", "Garden", "Treasury"], // Hall can go to all three rooms
  Garden: ["Hall"], // can only return to hall 
  Treasury: ["Hall"], // can only return to hall 
  Barracks: ["Hall"] // can only return to hall 
}
let currentState = "Hall"

// let playerStatus = {
//   state1: [""],
//   state2: [""],
//   state3: [""],
// }
let hasRanOnce = false;

start();

async function start() {
  // const welcomeMessage = `You enter the ruins of the Persian palace of Persepolis`;
  // let answer = await ask(welcomeMessage);
  if (!hasRanOnce) {
    console.log("\nYou enter the ruins of the palace of Persepolis");
    console.log("\nYou enter into the main room... the Hall");
    console.log("\nYou see three doors");
    let whichRoom = await ask(`\nDo you enter the (Barracks) (Garden) (Treasury): `);
  }
    if (whichRoom == "Treasury") {
      enterState("Treasury"); //! put room in ()?
      console.log(`\nYou Look around`);
      console.log(`\nIt has been looted except for a single large locked chest`);
      let inspect = await ask(`\nDo you inspect the chest?`);
        if (inspect = "Yes") {
          const filterInventory = playerInventory.filter(whereKey);
          function whereKey(item) {
            return item == "Key";
          } //! How to grab this true and make it do something
        } else {
          console.log(`\nWithout the key this chest will not open`);
          let goBack = await ask(`\nDo you want to return to the Hall? (Yes) or (No)`);
          if (goBack = "Yes") {
            enterState("Hall");
          } else {
            //! HOW DO I GET BACK
            console.log(`\nHow do I get back...`)
          }
        }
    } 
    if (whichRoom = "Garden") {
      enterState(); //! put room in ()?
      console.log(`\nYou Look around`);
      console.log(`\nYou notice a key`);
      console.log(`\n`);
      let pickUpKey = await ask(`\nPick up the key? (Yes) or (No)`);
      if (pickUpKey = "Yes") {
        moveItem("Garden", playerInventory, "Key");
        console.log(`\nYou pick up the key`);
      } 
      if (pickUpKey = "No") {
        enterState("Hall"); //! Double check
      }
    } 
    if (whichRoom = "Barracks") {
      enterState(); //! put room in ()?
      console.log(`\nYou Look around`);
      console.log(`\n`);
      let inspect = await ask(`\nDo you inspect the chest?`);
    } 
  


  // const welcomeMessage = `You enter the ruins of the Persian palace of Persepolis`;
  // let answer = await ask(welcomeMessage);
  // console.log('Now write your code to make this work!');
  
  
  
  
  
  
  
  
  //process.exit();
}

function enterState(newState) { 
  let validTransitions = state[currentState];
  if (validTransitions.includes(newState)) {
    let [currentState] = newState;
    return `We move into the ${currentState}`;
  } else {
    throw `Unable to move from ${currentState} to ${newState}`
  }
}

// function enterState(newState) { 
//   let validTransitions = state[currentState];
//   if (validTransitions.includes(newState)) {
//     let validTransitions = newState
//     return `We move into the ${currentState}`;
//   } else {
//     throw `Unable to move from ${currentState} to ${newState}`
//   }
// }


// let changeToHall = enterState("Hall");
// console.log(changeToHall);
// let changeToBarracks = enterState("Barracks");
// console.log(changeToBarracks);
// let changeToTreasury = enterState("Treasury");
// console.log(changeToTreasury);
// let changeToGarden = enterState("Garden");
// console.log(changeToGarden);


//! Make this a function or a factory function
function moveItem(source, destination, item) { // making function for repetition
  source.push(destination[item]);
  delete source[item];
}




/*//! Pseudo Code
player 
  //// - inventory = array[]
    - add items to it via .push
      - inventory['orange'] ( reference array element by its identifier and push/pop it)
  - status = state
  - status = state  
      player['inventory'].push(library['itemsInRoom']['cookBook']);
      delete library['itemsInRoom']['cookBook'];
  - status ( state )
  


  make function to move item from room inventory to player inventory

  Rooms
  - Nested objects
  - allowed actions (in the nested objects) 
  - has array of items 
  - description State Machine
  - connection = State Machine
  - inventory = array[]
  - state array for transitions 

  main desc "Once a great palace and administrative hub for the Persian Empire. Now lies in ruins. You can still see the finely carved stone reliefs which seem to cover every available inch of space"
  garden disc "Once filled with a plethora of fruiting trees and vines. Maybe something there is something valuable here still"
  treasury disc "It contains the vast wealth of Persepolis and a large number of archival documents"
*/


//! Timeline
/* 
2-28 assignment
3-1 story of persian castle 
    give the task of moving item to function
    pseudo code 
3-2 establish given variables
3-3 more pseudo code 
3-4 
3-5 
3-6 replace object array with classes



*/
