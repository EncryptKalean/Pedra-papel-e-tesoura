const elementos = {
    titulo: document.querySelector('h1'),
    opcoes_Computador: document.querySelectorAll('#enemy-options img'),
    opcoes_Jogador_Container: document.getElementById('player-options'),
};


// ------------------ Reset

function reset() {
    setTimeout(() => {
        elementos.titulo.textContent = 'Pedra, papel ou tesoura!';

        // Encontra a opção do Computador atualmente ativa (sem a classe "desativado") e desativa-a.
        const opcao_escolhida_Computador = Array.from(elementos.opcoes_Computador).find(opcB => !opcB.classList.contains('desativado'));
        opcao_escolhida_Computador.classList.add('desativado');

        // Reativa todas as opções do jogador, removendo a classe "desativado".
        const opcao_escolhida_jogador = elementos.opcoes_Jogador_Container.querySelectorAll('.desativado');
        opcao_escolhida_jogador.forEach((opcP) => { opcP.classList.remove('desativado') });

    }, 2000);
};



// ------------------- Resultado

const texto_vitoria = "venceu :)";
const texto_derrota = "perdeu :(";

function resultado(jogador, Computador) {

    const resultados = {

        // Regras de vitória: define o resultado de cada jogada do jogador contra o Computador.
        pedra: { papel: texto_derrota, tesoura: texto_vitoria },
        papel: { tesoura: texto_derrota, pedra: texto_vitoria },
        tesoura: { pedra: texto_derrota, papel: texto_vitoria },

    };

    // Se as escolhas forem iguais, exibe "empate". Caso contrário, mostra o resultado correspondente no título.
    elementos.titulo.textContent = (jogador === Computador ? "EMPATE 0_0" : `Você ${resultados[jogador][Computador]}`);

    reset();
};



// ---------------------- Computador

function jogadaComputador(escolhajogador) {

    // Gera um número aleatório (0 a 2) para escolher a jogada do Computador.
    const numeroAleatorio = Math.floor(Math.random() * 3);
    const escolhaComputador = elementos.opcoes_Computador[numeroAleatorio].getAttribute('name');

    // Remove a classe "desativado" para exibir a jogada do Computador.
    elementos.opcoes_Computador[numeroAleatorio].classList.remove('desativado');

    // Chama a função de resultado com as escolhas do jogador e do Computador.
    resultado(escolhajogador, escolhaComputador);
}



// ----------------------- jogador

elementos.opcoes_Jogador_Container.addEventListener('click', (click) => {
    const opcao = click.target.closest('img');

    // Verificação simples, para evitar que o sistema ative sem necessidade
    if (!opcao.classList.contains('desativado')) {
        // Obtém o name da jogada escolhida pelo jogador.
        const jogada = opcao.getAttribute('name');

        // Aplica a classe "desativado" a todas as opções do jogador, com exceção da que foi escolhida.
        elementos.opcoes_Jogador_Container.querySelectorAll('img').forEach((img) => { if (img.getAttribute('name') != jogada) img.classList.add('desativado') });

        // Executa a jogada do Computador, passando a escolha do jogador como parâmetro.
        jogadaComputador(jogada);
    };
})