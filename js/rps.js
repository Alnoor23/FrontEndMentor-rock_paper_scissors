setTimeout(() => {
    document.body.classList.remove('preload')
}, 300);


const rulesBtn = document.querySelector('.rules');
const closeBtn = document.querySelector('.modal-close');
const rulesModal = document.querySelector('.modal');
const choices = [
    {
        'name': 'paper',
        'beats': 'rock'
    },
    {
        'name': 'scissors',
        'beats': 'paper'
    },
    {
        'name': 'rock',
        'beats': 'scissors'
    }
];
const choiceBtns = document.querySelectorAll('.choice');
const gameDiv = document.querySelector('.container');
const resultDiv = document.querySelector('.result');
const pickedDivs = document.querySelectorAll('.result__picked');
const resultWinner = document.querySelector('.result__winner');
const resultText = document.querySelector('.result__winner__text');
const playAgainBtn = document.querySelector('.play-again');
const scoreNum = document.querySelector('.score__number')

let score = 0


choiceBtns.forEach(btn => {
    btn.addEventListener('click',() => {
        const choicename = btn.dataset.choice;
        const choice = choices.find((choice) => choice.name === choicename)
        choose(choice)
    })
})

function choose(choice) {
    const homechoice = homeChoice();
    displayResult([choice, homechoice]);
    displayWinner([choice, homechoice]);
}

function homeChoice() {
    const random = Math.floor(Math.random() * choices.length)
    return choices[random]
}
function displayResult(results) {
    pickedDivs.forEach((resultDiv, idx) =>{
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="choice ${results[idx].name}">
                    <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
                </div>
            `
        }, idx * 1000);
    })
    gameDiv.classList.toggle('hidden');
    resultDiv.classList.toggle('hidden');
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const homeWins = isWinner(results.reverse());

        if(userWins) {
            resultText.innerHTML = "You win";
            pickedDivs[0].classList.toggle("winner");
            keepScore(1);
        } else if(homeWins) {
            resultText.innerHTML = "You lose";
            pickedDivs[1].classList.toggle("winner");
            keepScore(-1);

        } else {
            resultText.innerHTML = "Draw";
        }
        resultWinner.classList.toggle('hidden');
        resultDiv.classList.toggle('show-winner');
    }, 1000);

}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

function keepScore(point) {
    score += point;
    scoreNum.innerText = score
}

playAgainBtn.addEventListener('click', () => {
    gameDiv.classList.toggle('hidden');
    resultDiv.classList.toggle('hidden');

    pickedDivs.forEach(div => {
        div.innerHTML = ""
        div.classList.remove("winner")
    })
    resultText.innerText = ""
    resultWinner.classList.toggle('hidden')
    resultDiv.classList.toggle('show-winner')
})

rulesBtn.addEventListener('click', () => {
    rulesModal.classList.toggle('visible')
})
closeBtn.addEventListener('click', () => {
    rulesModal.classList.toggle('visible')
})