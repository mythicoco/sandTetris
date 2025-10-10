const index = 50;
document.querySelector('.board').style.gridTemplateColumns = `repeat(${index}, 1fr)`
document.querySelector('.board').innerHTML = Array(index**2).fill(0).map((_,i) => `<div class="c${i} cube"></div>`).join(' ')
document.querySelectorAll('.cube').forEach(cube => {cube.style.backgroundColor = 'white'})
let mouseDown = false
document.querySelectorAll('.cube').forEach(cube => {cube.addEventListener('mousedown', () => {mouseDown = true});cube.addEventListener('mouseup', () => {mouseDown = false});cube.addEventListener('mousemove', (e) => {if (mouseDown) draw(e)});cube.addEventListener('click', (e) => {draw(e)}) })
const sandColor = 'yellow'
const waterColor = 'lightBlue'
const stealColor = 'gray'
let currentColor = sandColor
async function draw(a) {const classNum = Number(a.target.classList[0].match(/\d+/g));;document.querySelector(`.c${classNum}`).style.backgroundColor = currentColor;}

let physics = false
async function handleClick() {
    physics = physics ? false : true
    physics ? document.querySelector('.idk').innerHTML = 'click me<br>to turn off physics' : document.querySelector('.idk').innerHTML = 'click me<br>to turn on physics'
    while (physics) {let board = getBoard()
        for (let i=board.length-index-1;i>=0;i--) {if (board[i] === 1 || board[i] === 2) {board = lower(i, board)}}
        placeBoard(board)
        await new Promise(x => setTimeout(x,1))}
}

function setElementAs(element) {if (element === 1) {currentColor = sandColor} else if (element === 2) {currentColor = waterColor} else if(element === 3) {currentColor = stealColor} else if (element === 0) {currentColor = 'white'};document.querySelectorAll('.element').forEach(el => {el.disabled = false}); document.querySelector(`.e${element}`).disabled = true}

function lower(i, board) {
    const r = (i / index) | 0, c = i % index
    if (board[i] === 1) {if (board[i+index] === 0) {board[i] = 0;board[i+index] = 1} else {if (board[i+index-1] !== 0 && board[i+index+1] === 0 && c !== index-1) {;board[i] = 0;board[i+index+1] = 1} else if (board[i+index-1] === 0 && board[i+index+1] !== 0 && c !== 0) {board[i] = 0;board[i+index-1] = 1} else if (board[i+index-1] === 0 && board[i+index+1] === 0 && c !== 0 && c !== index-1) {board[i] = 0;const num = Math.round(Math.random() +1) === 1 ? 1 : -1;board[i+index+ num] = 1} else if (board[i+index-1] === 1 && board[i+index+1] === 1) return board;}
    } else if (board[i] === 2) {if (board[i+index] === 0) {board[i] = 0;board[i+index] = 2; return board;}
        for(let x=1;x<=50;x++) {
            if (board[i+index-x] === 0 && board[i+index+x] !== 0 && c >= x && isEmptyFor(i, -x, board)) {board[i] = 0;board[i+index-x] = 2;return board} else if (board[i+index-x] !== 0 && board[i+index+x] === 0 && c <= index-(x+1) && isEmptyFor(i, x, board)) {board[i] = 0;board[i+index+x] = 2;return board}
            else if (board[i+index-x] === 0 && board[i+index+x] === 0 && c <= index-(x+1) && c >= x && (isEmptyFor(i, -x, board) || isEmptyFor(i, x, board))) {board[i] = 0;const num = Math.round(Math.random() + 1) === 1 ? x : -x;board[i+index+num] = 2;return board} else if (board[i+index+x] === 0 && c <= index-1-x && isEmptyFor(i, x, board)) {board[i] = 0;board[i+index+x] = 2;return board} else if (board[i+index-x] === 0 && c >= x && isEmptyFor(i, -x, board)) {board[i] = 0;board[i+index-x] = 2;return board}
        }}; return board
}

function isEmptyFor(i, x, board) {for(let a=1;a<=Math.abs(x);a++) {if(board[i+ ((x > 0) ? a : (a * -1))] !== 0) return false}return true}

function placeBoard(b) {b.forEach((cube, i) => {if (cube === 0) {document.querySelector(`.c${i}`).style.backgroundColor = 'white'} else if (cube === 1) {document.querySelector(`.c${i}`).style.backgroundColor = sandColor} else if (cube === 2) {document.querySelector(`.c${i}`).style.backgroundColor = waterColor} else if (cube === 3) {document.querySelector(`.c${i}`).style.backgroundColor = stealColor}})}
function getBoard() {let board = [];document.querySelectorAll('.cube').forEach(cube => {if (getComputedStyle(cube).backgroundColor === 'rgb(255, 255, 255)') {board.push(0)} else if (getComputedStyle(cube).backgroundColor === 'rgb(255, 255, 0)') {board.push(1)} else if (getComputedStyle(cube).backgroundColor === 'rgb(173, 216, 230)') {board.push(2)} else if (getComputedStyle(cube).backgroundColor === 'rgb(128, 128, 128)') {board.push(3)}});return board;}