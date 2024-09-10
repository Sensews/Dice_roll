const diceElements = document.querySelectorAll('.dados');
const displayRolagens = document.getElementById('display-rolagens');
const bonusInput = document.getElementById('bonus');
const rollButton = document.getElementById('roll-dice-button');

let selectedDice = [];

diceElements.forEach(dice => {
    dice.addEventListener('click', () => {
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
        displayRolagens.innerHTML = ''; // Limpa a área de display para nova rolagem
        let total = 0;
        selectedDice.forEach(dice => {
            const rollResult = Math.floor(Math.random() * dice.value) + 1;
            total += rollResult;
            createDiceResultElement(dice.img, rollResult);
        });

        const bonus = parseInt(bonusInput.value) || 0;
        total += bonus;

        const resultElement = document.createElement('div');
        resultElement.classList.add('resultado-dado');
        resultElement.innerHTML = `<strong>Resultados:</strong> ${total} (Bônus: ${bonus})`;
        displayRolagens.appendChild(resultElement);

        // Limpa os dados selecionados para próxima rolagem
        selectedDice = [];
    }
});

function createDiceResultElement(diceImage, result) {
    const diceResultDiv = document.createElement('div');
    diceResultDiv.classList.add('resultado-dado');
    diceResultDiv.innerHTML = `
        <img src="Assets/Dados_Vazios/${diceImage.split('/').pop().replace('.svg', '_VAZIO.SVG')}" alt="Resultado do dado">
        <span>${result}</span>
    `;
    displayRolagens.appendChild(diceResultDiv);
}

function updateDisplay() {
    // Atualiza a exibição dos dados selecionados antes de rolar
    displayRolagens.innerHTML = '';
    selectedDice.forEach(dice => {
        const diceElement = document.createElement('img');
        diceElement.src = dice.img;
        diceElement.alt = `D${dice.value}`;
        diceElement.classList.add('dados');
        displayRolagens.appendChild(diceElement);
    });
}
