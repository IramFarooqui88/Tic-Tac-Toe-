const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6],
];
initGame();
function initGame(){
   currentPlayer = "X";
   gameGrid = ["","","","","","","","",""];
   //UI ko bhi empty kro
   boxes.forEach((box, index)=>{
      box.innerText = "";
      boxes[index].style.pointerEvents = "all";
      
      // initialize box with css property again
      box.classList = `box box${index+1}`;
   })
   newGameBtn.classList.remove("active");
   gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function swapTurn(){
   if(currentPlayer ==="X")
   currentPlayer = "O";
   else
   currentPlayer = "X";
   
   gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function handleClick(index){
   if(gameGrid[index] === ""){
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap karo turn ko
    swapTurn();
    //check karo koi jeet to nahi gya
    checkGameOver();
   }
}
boxes.forEach((box, index) => {
   box.addEventListener("click", () =>{
     handleClick(index);
   })
});
newGameBtn.addEventListener("click", initGame);
function checkGameOver(){
   let answer = "";
   winningPosition.forEach((position)=>{
      // all 3 boxes should be nonempty and has exactly same value:
      if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && 
      (gameGrid[position[1]] === gameGrid[position[2]]) && 
      (gameGrid[position[1]] === gameGrid[position[0]])){
            
           // check if winner is x
           if(gameGrid[position[0]]==="X")
           answer = "X";
           else 
           answer = "O";

           // winner mil gya ab disable pointer event 
           boxes.forEach((box)=>{
              box.style.pointerEvents = "none";
           }
           )

           // ab background color green krdo
           boxes[position[0]].classList.add("win");
           boxes[position[1]].classList.add("win");
           boxes[position[2]].classList.add("win");
      }
   })
   if(answer !== "")
   {
      gameInfo.innerText = `Winner Player - ${answer}`;
      newGameBtn.classList.add("active");
      return;
   }
   // game tie ho gya koi winner nahi hai
   let fillCount = 0;
   gameGrid.forEach((box) => {
      if(box !== "")fillCount++;
   });
   if(fillCount===9)
   {
      gameInfo.innerText = "Game Tie";
      newGameBtn.classList.add("active");
   }
}