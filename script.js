const diceElements = document.querySelectorAll('.dados');
const displayRolagens = document.getElementById('display-rolagens');
const bonusInput = document.getElementById('bonus');
const rollButton = document.getElementById('roll-dice-button');

let selectedDice = [];
let isAnimating = false; // Variável de estado para controlar a animação

diceElements.forEach(dice => {
    dice.addEventListener('click', () => {
        if (isAnimating) return; // Impede adicionar dados se a animação estiver em andamento

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
        let bonus = parseInt(bonusInput.value) || 0;

        isAnimating = true; // Marca que a animação está em andamento

        // Função para animar a rolagem de cada dado
        selectedDice.forEach((dice, index) => {
            const diceResult = Math.floor(Math.random() * dice.value) + 1;
            total += diceResult;

            animateDiceRoll(dice.img, diceResult, dice.value); // Corrigido para passar o valor correto
        });

        // Exibe o total após o tempo da animação
        setTimeout(() => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('resultado-dado');
            resultElement.innerHTML = `<strong>Resultado Final:</strong> ${total + bonus}`;
            displayRolagens.appendChild(resultElement);

            // Limpa os dados selecionados para a próxima rolagem
            selectedDice = [];
            isAnimating = false; // Marca que a animação terminou
        }, 1500); // Tempo para esperar o fim da animação
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

    // Animação com números aleatórios
    let animationDuration = 1500; // 1.5 segundos de animação
    let intervalTime = 100; // Intervalo entre números aleatórios
    let animationTime = 0;

    const interval = setInterval(() => {
        if (animationTime >= animationDuration) {
            clearInterval(interval);
            diceResultDiv.querySelector('span').textContent = finalResult; // Exibe o resultado final
        } else {
            let randomValue = Math.floor(Math.random() * diceValue) + 1; // Usa o valor correto do dado
            diceResultDiv.querySelector('span').textContent = randomValue;
        }
        animationTime += intervalTime;
    }, intervalTime);
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
