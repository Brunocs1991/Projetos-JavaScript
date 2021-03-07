var jogadorNome;

var jogadorEscolha = 0;
var jogadorPontos = 0;

var computadorPontos = 0;
var computadorEscolha = 0;

//exibe mensagem
function mensagem(texto){
    document.getElementById('mensagem').innerHTML = texto;
}
//define nome jogador na tela
function definirNomeJogador(nome){
    document.getElementById('jogador-nome').innerHTML = nome
}
//Sorteia ente 2 numeros;
function sortear(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//calcula e retorna quem ganhou
// 0- empate
// 1 - jogador
// 2 - computador
function calcularEscolha(jogador, computador){
    if(jogador == 1 && computador == 1){
        return 0;
    }
    else if(jogador == 1 && computador == 2){
        return 2;
    }
    else if(jogador == 1 && computador == 3){
        return 1;
    }
    else if(jogador == 2 && computador == 1){
        return 1;
    }
    else if(jogador == 2 && computador == 2){
        return 0;
    }
    else if(jogador == 2 && computador == 3){
        return 2;
    }
    else if(jogador == 3 && computador == 1){
        return 2;
    }
    else if(jogador == 3 && computador == 2){
        return 1;
    }
    else if(jogador == 3 && computador == 3){
        return 0;
    }
}
//pontos jogador
function somarPontoJogador(){
    jogadorPontos += 1;
    document.getElementById('jogador-pontos').innerHTML = jogadorPontos;
}
//pontos computador
function somarPontoComputador(){
    computadorPontos += 1;
    document.getElementById('computador-pontos').innerHTML = computadorPontos;
}
function selecionar(tipo, escolha){
    document.getElementById(tipo + "-escolha-"+escolha).classList.add('selecionado');
}
function deselecionar(tipo, escolha){
    document.getElementById(tipo + "-escolha-"+escolha).classList.remove('selecionado');
}
//Escolha do usuario
//1 pedra
//2 papel
//3 tesoura
function jogar(escolha){
    jogadorEscolha = escolha;
    selecionar('jogador', jogadorEscolha);
    //Sortear jogada computador
    computadorEscolha = sortear(1,3);
    selecionar('computador', computadorEscolha);
    //Calcular quem ganhou e somar pontos
    var ganhador = calcularEscolha(jogadorEscolha, computadorEscolha);
    if(ganhador == 0){
        mensagem('Empate');
    }
    else if(ganhador == 1){
        mensagem('Ponto para ' + jogadorNome);
        somarPontoJogador();
    }
    if(ganhador == 2){
        mensagem('Ponto para Computador');
        somarPontoComputador();
    }
    setTimeout(function() {
        deselecionar('jogador', jogadorEscolha);
        deselecionar('computador', computadorEscolha);
        mensagem(jogadorNome + ' escolha uma opção...')
    },600);
}
document.getElementById('jogador-escolha-1').onclick = function(){jogar(1)};
document.getElementById('jogador-escolha-2').onclick = function(){jogar(2)};
document.getElementById('jogador-escolha-3').onclick = function(){jogar(3)};

jogadorNome = prompt('Qual é o seu nome?');
mensagem('Bem vindo, ' + jogadorNome + ' está preparado? Escolha uma opção acima ...');
definirNomeJogador(jogadorNome);




