const fill = document.querySelector(".fill");
const empties = document.querySelectorAll(".empty");

const puzzlePieces = document.querySelectorAll(".fill");
const puzzlePiecesContainer = document.querySelector(".puzzle-pieces");
let imageToAppend = null;

//Fill Listeners
puzzlePieces.forEach((x) => x.addEventListener("dragstart", dragStart));
puzzlePieces.forEach((x) => x.addEventListener("dragend", dragEnd));

//Shuffler btn
const shuffleBtn = document.querySelector("#shuffler");
shuffleBtn.addEventListener("click", () => {
  let elementsInsidePuzzleContainer = puzzlePiecesContainer.children;

  let currentCardsIDs = idGetter(elementsInsidePuzzleContainer);

  let shuffleCards = shuffleArray([...currentCardsIDs]);

  for (let i = 0; i < elementsInsidePuzzleContainer.length; i++) {
    elementsInsidePuzzleContainer[
      i
    ].src = `./puzzle-pieces/medium/${shuffleCards[i]}.png`;
  }
});

//Grab all the images and assign a src randomly
//Swift indexes
//Debug because is shuffling from the image array instead of the remaining images
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

let shuffleNumbers = shuffleArray([...puzzlePieces].map((x, i) => i + 1));

[...puzzlePieces].map(
  (x, i) => (x.src = `./puzzle-pieces/medium/${shuffleNumbers[i]}.png`)
);

//Function to check that all the puzzle pieces are in the right order
let piecesInsideThePuzzle = document.querySelectorAll(".puzzle-place .empty");
//This idGetter function will be inside of getPieces in case it works!
function idGetter(arr) {
  let currentPiecesIDs = [];
  for (let image of arr) {
    let pieceInfo = image.currentSrc;
    let regex = /\d{1,2}\.png/g;
    if (pieceInfo !== null) {
      currentPiecesIDs.push(+pieceInfo.match(regex)[0].match(/\d{1,2}/)[0]);
    }
  }
  return currentPiecesIDs;
}

function getPieces() {
  let currentPiecesIDs = [];
  //First check that all the pieces are in the puzzle
  if (puzzlePiecesContainer.childElementCount == 0) {
    for (let piece of piecesInsideThePuzzle) {
      let pieceInfo = piece.firstChild.src;
      let regex = /\d{1,2}\.png/g;
      if (pieceInfo !== null) {
        currentPiecesIDs.push(+pieceInfo.match(regex)[0].match(/\d{1,2}/)[0]);
      }
    }
    return currentPiecesIDs;
  }
}

function gameOver() {
  let currentPieces = getPieces();
  if (currentPieces) {
    for (let i = 0; i < currentPieces.length; i++) {
      if (currentPieces[i] !== i + 1) {
        return;
      }
    }
    //startConfetti();
    alert("you won");
  }
  //return arr;
}

//Loop though empties and call drag events
for (const empty of empties) {
  empty.addEventListener("dragover", dragOver);
  empty.addEventListener("dragenter", dragEnter);
  empty.addEventListener("dragleave", dragLeave);
  empty.addEventListener("dragover", dragDrop);
}

//Drag Functions
function dragStart() {
  this.className += " hold";
  setTimeout(() => (this.className = "invisible"), 0);
  imageToAppend = this;
}

function dragEnd(e) {
  this.className = "fill";
  let parentNode = this.parentNode;
  //let parentNodeClass = parentNode.getAttribute("class");

  if (parentNode.childNodes.length > 1) {
    let firstChild = parentNode.firstChild;
    parentNode.removeChild(firstChild);
    parentNode.append(imageToAppend);
    puzzlePiecesContainer.append(firstChild);
  }

  parentNode.append(imageToAppend);
  //Implement the gameOver checker
  //set a time out for like a second or two to announce
  setTimeout(gameOver, 200);
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className += " hovered";
}
function dragLeave() {
  this.className = "empty";
}
function dragDrop(e) {
  this.className = "empty";

  this.append(imageToAppend);
}
