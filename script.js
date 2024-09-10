const diceElements = document.querySelectorAll('.dados');
const displayRolagens = document.getElementById('display-rolagens');
const bonusInput = document.getElementById('bonus');
const rollButton = document.getElementById('roll-dice-button');

let selectedDice = [];
let isAnimating = false; 

diceElements.forEach(dice => {
    dice.addEventListener('click', () => {
        if (isAnimating) return;

        const diceId = dice.id;
        if (diceId === 'dX') {
            const diceValue = prompt("Digite o valor do dado personalizado (ex: 100 para d100):");
            if (diceValue && !isNaN(diceValue)) {
                selectedDice.push({ value: parseInt(diceValue), img: dice.src });
            }
        } else {
            const diceValue = parseInt(diceId.substring(1));
            selectedDice.push({ value: diceValue, img: dice.src });
        }
        updateDisplay();
    });
});

rollButton.addEventListener('click', () => {
    if (selectedDice.length > 0) {
        displayRolagens.innerHTML = ''; 
        let total = 0;
        let bonus = parseInt(bonusInput.value) || 0;

        isAnimating = true; 

        selectedDice.forEach((dice, index) => {
            const diceResult = Math.floor(Math.random() * dice.value) + 1;
            total += diceResult;

            animateDiceRoll(dice.img, diceResult, dice.value);
        });

        setTimeout(() => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('resultado-dado');
            resultElement.innerHTML = `<strong>Final Results:</strong> ${total + bonus}`;
            displayRolagens.appendChild(resultElement);

            selectedDice = [];
            isAnimating = false; 
        }, 1500); 
    }
});

function animateDiceRoll(diceImage, finalResult, diceValue) {
    const diceResultDiv = document.createElement('div');
    diceResultDiv.classList.add('resultado-dado');
    const diceEmptyImage = `Assets/Dados_Vazios/${diceImage.split('/').pop().replace('.svg', '_VAZIO.SVG')}`;
    
    diceResultDiv.innerHTML = `
        <img src="${diceEmptyImage}" alt="Resultado do dado">
        <span>${finalResult}</span>
    `;
    
    displayRolagens.appendChild(diceResultDiv);

    let animationDuration = 1500; 
    let intervalTime = 100; 
    let animationTime = 0;

    const interval = setInterval(() => {
        if (animationTime >= animationDuration) {
            clearInterval(interval);
            diceResultDiv.querySelector('span').textContent = finalResult; 
        } else {
            let randomValue = Math.floor(Math.random() * diceValue) + 1; 
            diceResultDiv.querySelector('span').textContent = randomValue;
        }
        animationTime += intervalTime;
    }, intervalTime);
}

function updateDisplay() {
    displayRolagens.innerHTML = '';
    selectedDice.forEach(dice => {
        const diceElement = document.createElement('img');
        diceElement.src = dice.img;
        diceElement.alt = `D${dice.value}`;
        diceElement.classList.add('dados');
        displayRolagens.appendChild(diceElement);
    });
}
