const fill = document.querySelector(".fill");
const empties = document.querySelectorAll(".empty");

const puzzlePieces = document.querySelectorAll(".fill");
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
  //Testing for background
  //maybe image to append will be set to null

  console.log("end");
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
  //this.append(fill);
  this.append(imageToAppend);
}
