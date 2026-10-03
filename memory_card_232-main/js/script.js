// ======================================================
// JOGO DA MEMÓRIA - Versão simplificada
// ======================================================

// Constante criada para ler os objectos do tabuleiro
const cards = document.querySelectorAll('.memory-card');

// Variáveis que controlam o estado do jogo
let primeiraCarta = null;   // guarda a 1ª carta clicada
let segundaCarta = null;    // guarda a 2ª carta clicada
let podeClicar = true;      // impede novos cliques enquanto o jogo "pensa"
let paresEncontrados = 0;   // conta quantos pares já foram descobertos

const totalDePares = cards.length / 2; // total de pares que existem no tabuleiro

// Função chamada toda vez que o jogador clica em uma carta
function virarCarta() {
    if (!podeClicar) return;    // Se o tabuleiro estiver travado, não faz nada

    // Se clicar duas vezes na mesma carta, não faz nada
    if (this === primeiraCarta) return;

    // Mostra a carta na tela (classe CSS que faz o "flip")
    this.classList.add('flip');

    // Se ainda não escolhemos a primeira carta, esta é a primeira
    if (primeiraCarta === null) {
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;        // Se já temos uma primeira carta, esta é a segunda
    verificarPar();
}

// Verifica se as duas cartas viradas formam um par
function verificarPar() {
    const cartasIguais = primeiraCarta.dataset.framework === segundaCarta.dataset.framework;

    if (cartasIguais) {
        manterParEncontrado();
    } else {
        desvirarCartas();
    }
}

// As cartas são iguais: mantém viradas e soma o par encontrado
function manterParEncontrado() {
    // Tira o evento de clique, já que essas cartas não precisam mais ser clicadas
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);

    paresEncontrados++;

    resetarJogada();

    // Se todos os pares já foram encontrados, o jogo acabou
    if (paresEncontrados === totalDePares) {
        fimDeJogo();
    }
}

// As cartas são diferentes: espera um pouco e vira as duas de volta
function desvirarCartas() {
    podeClicar = false;

    setTimeout(() => {
        if (primeiraCarta) primeiraCarta.classList.remove('flip');
        if (segundaCarta) segundaCarta.classList.remove('flip');

        resetarJogada();
    }, 1500);
}

// Limpa as variáveis da jogada atual (usada tanto no acerto quanto no erro)
function resetarJogada() {
    primeiraCarta = null;
    segundaCarta = null;
    podeClicar = true;
}

// Embaralha a posição das cartas na tela, mudando a ordem visual (CSS order)
function embaralharCartas() {
    cards.forEach(card => {
        const posicaoAleatoria = Math.floor(Math.random() * cards.length);
        card.style.order = posicaoAleatoria;
    });
}

// Chamada automaticamente quando o jogador encontra todos os pares
function fimDeJogo() {
    alert('Parabéns! Você encontrou todos os pares!');
    resetarTabuleiro();
}

// Reinicia o tabuleiro para uma nova partida:
// esconde todas as cartas, embaralha de novo e reativa os cliques
function resetarTabuleiro() {
    paresEncontrados = 0;

    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', virarCarta);
    });

    embaralharCartas();
}

// Inicialização do tabuleiro na primeira execução
resetarTabuleiro();