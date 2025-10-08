const index = 100;
document.querySelector('.board').style.gridTemplateColumns = `repeat(${index}, 1fr)`
document.querySelector('.board').innerHTML = Array(index**2).fill(0).map((_,i) => `<div class="c${i} cube"></div>`).join(' ')
document.querySelectorAll('.cube').forEach(cube => {cube.style.backgroundColor = 'white'})
let mouseDown = false
let mouseUp = false
document.querySelectorAll('.cube').forEach(cube => {
    const board = document.querySelector('.board')
    cube.addEventListener('mousedown', () => {mouseDown = true; mouseUp = false})
    cube.addEventListener('mouseup', () => {mouseUp = true; mouseDown = false})


    cube.addEventListener('mousemove', (e) => {
        if (mouseDown) draw(e);
    })
})


function draw(e) {
    const classNum = Number(e.target.classList[0].match(/\d+/g))
    document.querySelector(`.c${classNum}`).style.backgroundColor = 'black'
    document.querySelector(`.c${classNum+1}`).style.backgroundColor = 'black'
    document.querySelector(`.c${classNum+index}`).style.backgroundColor = 'black'
    document.querySelector(`.c${classNum+index+1}`).style.backgroundColor = 'black'
}


async function handleClick() {
    for (let i=0;i<index-1;i++) {
        console.log('going down!')
        let board = getBoard()
        for (let i=board.length-index-1;i>=0;i--) {
            if (board[i] === 1) {
                board = lower(i, board)
            }
        }
        placeBoard(board)
        await new Promise(x => setTimeout(x,5))
    }
}
function lower(i, board) {
    const r = (i / index) | 0, c = i % index
    if (r === index-1 || c === index-1 || c === 0) return board 
    if (i === 0) return board
    if (board[i+index] === 0) {
        board[i] = 0
        board[i+index] = 1
    } else {
        if (board[i+index-1] === 1 && board[i+index+1] === 0) {
            board[i] = 0
            board[i+index+1] = 1
        } else if (board[i+index-1] === 0 && board[i+index+1] === 1) {
            board[i] = 0
            board[i+index-1] = 1
        } else if (board[i+index-1] === 0 && board[i+index+1] === 0) {
            board[i] = 0
            const num = Math.round(Math.random() +1)
            board[i+index+ num === 1 ? 1 : -1] = 1
        } else if (board[i+index-1] === 1 && board[i+index+1] === 1) return board;
    }
    return board
}

function placeBoard(b) {
    b.forEach((cube, i) => {
        if (cube === 0) {document.querySelector(`.c${i}`).style.backgroundColor = 'white'} else {document.querySelector(`.c${i}`).style.backgroundColor = 'black'}
    })
}


function getBoard() {
    let board = []
    document.querySelectorAll('.cube').forEach(cube => {
        if (getComputedStyle(cube).backgroundColor === 'rgb(255, 255, 255)') {board.push(0)} else {board.push(1)}
    })
    return board;
}











