const fill = document.querySelector(".fill");
const empties = document.querySelectorAll(".empty");

const puzzlePieces = document.querySelectorAll(".fill");
const puzzlePiecesContainer = document.querySelector(".puzzle-pieces");
let imageToAppend = null;

//Fill Listeners
puzzlePieces.forEach((x) => x.addEventListener("dragstart", dragStart));
puzzlePieces.forEach((x) => x.addEventListener("dragend", dragEnd));

//Loop though empties and call drag events
for (const empty of empties) {
  empty.addEventListener("dragover", dragOver);
  empty.addEventListener("dragenter", dragEnter);
  empty.addEventListener("dragover", dragLeave);
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
