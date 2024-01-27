const divs = document.querySelectorAll('.mainDiv div');
const firstoption = document.querySelector('#firstoption');
const secondoption = document.querySelector('#secondoption');
const resetgame=document.getElementById('restart');

console.log(divs);
let boxvalue;

let userOption = 'X';
let computerOption;

firstoption.addEventListener('click', (event) => {
    userOption = event.target.innerText;
})
secondoption.addEventListener('click', (event) => {
    userOption = event.target.innerText;
})

let winningpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let clickables = [];
let flag = true;
console.log(divs);
let newArray = [];
for (let button of divs) {
    clickables.push(button);
    console.log("The buttons");
    newArray = [...clickables];
    button.addEventListener('click', () => {
        if (!flag) return;
        if (userOption == 'X') {
            computerOption = 'O';
            fillposition(clickables, button, userOption, computerOption)
        }
        else {
            computerOption = 'X';
            fillposition(clickables, button, userOption, computerOption)
        }


    })
}

function fillposition(clickables, button, userOption, computerOption) {
    if (clickables.includes(button)) {
        button.innerText = userOption;
        let index = clickables.indexOf(button);
        clickables.splice(index, 1);
        let divslength = clickables.length;
        console.log("The Length of the spliced array",divslength);
        winner();
        if(divslength===0){
                if(flag===true){
                    alert('Its a Tie')
                }
        }
        // Computer Function to put values
        if(divslength!=0){
            let randomValue = (Math.floor((Math.random() * divslength)));
            clickables[randomValue].innerText = computerOption;
            winner();
            console.log("Comouter Function");
            console.log(randomValue);
            clickables.splice(randomValue, 1);
        }
       
    }
    else {
        alert('Use Another Position already filled')
    }
}

function winner() {
    for (let pattern of winningpatterns) {
        let position1 = pattern[0];
        let position2 = pattern[1];
        let position3 = pattern[2];
        if (newArray[position1].innerText != '' && newArray[position2].innerText != '' && newArray[position3].innerText != '') {
            if (newArray[position1].innerText == newArray[position2].innerText && newArray[position2].innerText == newArray[position3].innerText) {
                flag = false;
                newArray[position1].classList.add('winner');
                newArray[position2].classList.add('winner');
                newArray[position3].classList.add('winner');
            }
        }
    }
}

resetgame.addEventListener('click',()=>{
    flag=true;
    for(let button of newArray){
        console.log(button.innerText);
        button.innerText='';
        button.classList.remove('winner')
    }
})




