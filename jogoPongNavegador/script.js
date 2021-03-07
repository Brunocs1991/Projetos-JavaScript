window.onload = function(){
    iniciar();
    setInterval(principal, 1000/30);
}
function iniciar(){
    posicaoBolaX = posicaoBolaY = 10;
    velocidadeBolaPosicaoX = velocidadeBolaPosicaoY = 3;
    posicaoJogador1 = posicaoJogador2 = 40;
    pontuacaoJogador1 = pontuacaoJogador2 = 0;

    folhaDesenho = document.getElementById("folha");
    areaDesenho = folhaDesenho.getContext("2d");

    larguraCampo = 600;
    alturaCampo = 500;
    expessuraRede = 5;
    diametroBola = 10;
    expessuraRaquete = 11;
    alturaRaquete = 100;
    efeitoRaquete = 0.3;
    velocidadeJogador2 = 5;

    folhaDesenho.addEventListener('mousemove', function(e){
        posicaoJogador1 = e.clientY - alturaRaquete / 2;
    });
}
function principal(){
    desenha();
    calcular();
}
function desenha(){
    areaDesenho.fillStyle = '#286047';  //cor verde
    areaDesenho.fillRect(0,0,larguraCampo,alturaCampo);  //desenhando Mesa
    areaDesenho.fillStyle = "#ffffff"  //cor Branco
    areaDesenho.fillRect(larguraCampo / 2 - expessuraRede / 2, 0, expessuraRede, alturaCampo);  // desenha arede
    areaDesenho.fillRect(posicaoBolaX - diametroBola / 2, posicaoBolaY - diametroBola / 2, diametroBola, diametroBola); // desenha a bola
    areaDesenho.fillRect(0,posicaoJogador1, expessuraRaquete, alturaRaquete) //raquete 1
    areaDesenho.fillRect(larguraCampo - expessuraRaquete, posicaoJogador2, expessuraRaquete, alturaRaquete) //raquete 2
    areaDesenho.fillText("Humano - " + pontuacaoJogador1 + " pontos", 100, 100); //Escrever pontuação jogador 1
    areaDesenho.fillText("Computador - " + pontuacaoJogador2 + " pontos", larguraCampo - 200, 100); //Escrever pontuação jogador 1
}
function calcular(){
    //definição movimentação bola
    posicaoBolaX += velocidadeBolaPosicaoX;
    posicaoBolaY += velocidadeBolaPosicaoY;

    //Verifica lateral superior
    if(posicaoBolaY < 0 && velocidadeBolaPosicaoY < 0){
        velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
    }

    //Verifica lateral inferior
    if(posicaoBolaY > alturaCampo && velocidadeBolaPosicaoY > 0){
        velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
    }

    //Verifica pontuação do jogador 2
    if(posicaoBolaX < 0){
        if(posicaoBolaY > posicaoJogador1 && posicaoBolaY < posicaoJogador1 + alturaRaquete){
            //Rebater a bola
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
            var diferencaY = posicaoBolaY - (posicaoJogador1 + alturaRaquete / 2);
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
        }else{
            //ponto jogador 2
            pontuacaoJogador2 += 1;
            //posicionar Bola no meio
            posicionarBola();
        }
    }
    //Verifica pontuação do jogador 1
    if(posicaoBolaX > larguraCampo){
        if(posicaoBolaY > posicaoJogador2 && posicaoBolaY< posicaoJogador2 + alturaRaquete){
            //rebater a bola
            velocidadeBolaPosicaoX = - velocidadeBolaPosicaoX;
            var diferencaY = posicaoBolaY - (posicaoJogador2 + alturaRaquete / 2);
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
        }else{
            //ponto jogador 1
            pontuacaoJogador1 += 1;
            //posicionar Bola no meio
            posicionarBola();
        }
    }
    if(posicaoJogador2 + alturaRaquete / 2 < posicaoBolaY){
        posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
    }else{
        posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
    }
}
function posicionarBola(){
    //Colocar bola no centro
    posicaoBolaX = larguraCampo / 2;
    posicaoBolay = alturaCampo / 2;
    velocidadeBolaPosicaoX = - velocidadeBolaPosicaoX;
    velocidadeBolaPosicaoY = 3;
}