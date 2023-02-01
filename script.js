// Variaveis auxiliares
let videos = ["imagens/unicornparrot.gif", "imagens/tripletsparrot.gif", "imagens/revertitparrot.gif", "imagens/metalparrot.gif", "imagens/fiestaparrot.gif", "imagens/explodyparrot.gif", "imagens/bobrossparrot.gif"];
let numerodecartas = null;
let virado = false;
let jogando = true;
let jogadas = 1;
let cartas = [];
let card;
let contador;
let resposta;
let viradas = document.querySelectorAll(".virado");
const jogo = document.querySelector(".jogo");
const frame = 1000/60;

// Crio o jogo e começo a contar o tempo
criandojogo();
contar();

// Função que cria o jogo
function criandojogo(){
    while (((numerodecartas % 2 == 0) && numerodecartas >= 4 && numerodecartas <= 14) == false){
        numerodecartas = prompt("Quantas cartas você quer jogar? (escolha um número par de 4 a 14)");
    }
    
    for (let i = 0; i < numerodecartas; i++){
        cartas.push(i);
    }

    cartas.sort(comparador);

    for (let i = 0; i < numerodecartas; i++){
        jogo.innerHTML += `<div class="card" onclick="virar(this)">
                <div class="front-face face">
                    <img src="imagens/front.png"></img>
                </div>
                <div class="back-face face">
                    <img src="${videos[Math.floor(cartas[i]/2)]}">
                </div>
            </div>`;
    }

    contador = 0;
}

// função que randomiza o baralho
function comparador() { 
	return Math.random() - 0.5; 
}

function virar(elemento){
    // Variaveis auxiliares que ajudam a por cowdown nos cliques do jogador
    let timer = 0;
    let cartasclicadas = document.querySelectorAll(".virando");

    // Caso o jogador ja tenha clicado 2 vezes eu espero 0.5 segundos para que ele realize a sua jogada
    if (cartasclicadas.length == 2){
        timer = 500;

    // Caso ele ja tenha feito 2 cliques o cowdown diminui
    } else if (timer > 0){
        timer--;

    // Para os demais casos ele segue com o jogo
    } else {
        // Add a classe virando que vira a carta e usamos pra saber qual carta a pessoa selecinou
        elemento.classList.add("virando");

        // Caso a carta selecionada ja estiver virada ou for a propria carta não faça nada.
        if (elemento.classList.contains("virado") || elemento.classList == card){
        
        } else {
            // Caso a carta for a primeira a ser virada a adicionamos a variavel card1
            if (!virado){
                virado = true;
                card = elemento;
                jogadas++;

            } else {
                virado = false;
                
                // Caso a imagem das duas cartas forem iguais retiramos a sua classe virando e adicionamos a elas a classe virado
                if (card.childNodes[3].innerHTML == elemento.childNodes[3].innerHTML){
                    setTimeout(function(){   card.classList.remove("virando"); elemento.classList.remove("virando"); }, 500);
                    card.classList.add("virado");
                    elemento.classList.add("virado");
        
                    viradas = document.querySelectorAll(".virado");

                    // Caso o numero de cartas viradas for igual ao numero de cartas do jogo nós mandamos a mensagem que o jogador ganhou e perguntamos se ele deseja jogar novamente
                    if (viradas.length == numerodecartas){
                        const tempo = document.querySelector(".contador").innerHTML;
                        setTimeout(function(){ alert("Você ganhou em " + jogadas + " jogadas! e em " + tempo + " segundos"); }, 1000);
                        setTimeout(function(){ resposta = prompt("Deseja jogar novamente? (digite sim ou não)");
                            
                            if (resposta == "sim"){
                                cartas = [];
                                jogadas = 0;
                                resposta = '';
                                numerodecartas = 0;
                                jogo.innerHTML = null;
                        
                                criandojogo();
                            }
                        }, 1500);
                    }
                    
                // Caso o jogador tenha errado a carta nós desviramos elas
                } else {
                    setTimeout(function(){   card.classList.remove("virando"); elemento.classList.remove("virando"); }, 1000);
                    jogadas++
                }
            }
        }
    }
}

// Função que conta o tempo
function contar() {
    setInterval(passartempo, 1000);
}

// função que aumenta o contador
function passartempo() {
  contador++;
  document.querySelector(".contador").innerHTML = contador;
}