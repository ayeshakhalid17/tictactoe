const X_CLASS="x";
const CIRCLE_CLASS="o"; 
const boxes=document.querySelectorAll('[boxes]');
const board=document.getElementById("container");
const winning_message=document.getElementsByClassName("winningmessage")[0];
const winning_message_text=document.querySelector('[winning-message-text]');
const restart=document.getElementById("restart");
const winning_combos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]; 
let circleTurn;
startGame(); 
restart.addEventListener("click",startGame);
function startGame()
{
    circleTurn=false;
    boxes.forEach(box=>{
    box.classList.remove(X_CLASS);
    box.classList.remove(CIRCLE_CLASS);
    box.addEventListener('click',handleClick,{once:true})
    })
    setBoardHoverClass();
    winning_message.classList.remove("show");
}
function handleClick(e) 
{
    const box=e.target;
    const currentClass=circleTurn?CIRCLE_CLASS:X_CLASS;
    placeMark(box,currentClass);
    if(checkWin(currentClass))
    {
        endGame(false);
    }
    else if(isDraw())
    {
        endGame(true);
    }
    else
    {
        swapTurns();
        setBoardHoverClass();
    }
}
function placeMark(box,currentClass)
{
    box.classList.add(currentClass);
}
function swapTurns()
{
    circleTurn=!circleTurn; 
}
function setBoardHoverClass()
{
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn)
    {
        board.classList.add(CIRCLE_CLASS);
    }
    else
    {
        board.classList.add(X_CLASS);
    }
}
function checkWin(currentClass)
{
    return winning_combos.some(combo=>{
        return combo.every(index=>{
            return boxes[index].classList.contains(currentClass)
        })
    })
}
function endGame(draw)
{
    if(draw)
    {
        winning_message_text.innerText="Draw!";
    }
    else
    {
        winning_message_text.innerText=`${circleTurn ? "O's": "X's"} Wins!`;
    }
    winning_message.classList.add("show"); 
}
function isDraw()
{
    return [...boxes].every(box=>{
        return box.classList.contains(X_CLASS)|| box.classList.contains(CIRCLE_CLASS);
        })
}