document.addEventListener('DOMContentLoaded', () => {
    const dadosSelecionados = [];
    const bonusInput = document.getElementById('bonus');
    const displays = document.querySelector('.displays-de-rolagens');

    document.querySelectorAll('.selecionar-dados img').forEach(dado => {
        dado.addEventListener('click', () => {
            const id = dado.id;
            if (!dadosSelecionados.includes(id)) {
                dadosSelecionados.push(id);
                atualizarDisplays();
            }
        });
    });

    document.querySelector('.rolar-dados').addEventListener('click', () => {
        if (dadosSelecionados.length === 0) return;

        let totalSoma = 0;
        displays.innerHTML = '';

        dadosSelecionados.forEach(id => {
            const dado = document.createElement('div');
            dado.classList.add('dado');
            dado.innerHTML = `
                <img src="Assets/Dados/${id}.svg" alt="${id}">
                <div class="resultado">${rolarDado(id)}</div>
            `;
            displays.appendChild(dado);
        });

        const bonus = parseInt(bonusInput.value) || 0;
        const somaTotal = Array.from(displays.querySelectorAll('.resultado')).reduce((sum, resultado) => {
            return sum + parseInt(resultado.textContent) || 0;
        }, bonus);

        const somaElement = document.createElement('div');
        somaElement.classList.add('soma-total');
        somaElement.textContent = `Soma Total: ${somaTotal}`;
        displays.appendChild(somaElement);

        dadosSelecionados.length = 0; // Limpar seleção após rolar
    });

    function atualizarDisplays() {
        displays.innerHTML = '';
        dadosSelecionados.forEach(id => {
            const dado = document.createElement('div');
            dado.classList.add('dado');
            dado.innerHTML = `
                <img src="Assets/Dados/${id}_Vazio.svg" alt="${id}">
                <div class="resultado">?</div>
            `;
            displays.appendChild(dado);
        });
    }

    function rolarDado(id) {
        if (id === 'dX') {
            const tamanho = prompt('Qual o tamanho do dado misterioso?');
            return Math.floor(Math.random() * parseInt(tamanho)) + 1;
        } else {
            const faces = parseInt(id.substring(1)) || 6;
            return Math.floor(Math.random() * faces) + 1;
        }
    }
});
