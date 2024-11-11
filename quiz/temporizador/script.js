let temporizador = 60;
let barraProgresso = document.getElementById('barra-progresso');
let botaoReiniciar = document.getElementById('botao-reiniciar');
let intervalo;

function iniciarTemporizador() {
    intervalo = setInterval(() => {
        temporizador--;
        document.getElementById('temporizador').innerText = temporizador;

        if (temporizador >= 45) {
            barraProgresso.className = 'progress-bar progress-bar-striped azul';
            barraProgresso.style.width = `${temporizador / 60 * 100}%`;
        } else if (temporizador >= 30) {
            barraProgresso.className = 'progress-bar progress-bar-striped verde';
            barraProgresso.style.width = `${temporizador / 60 * 100}%`;
        } else if (temporizador >= 15) {
            barraProgresso.className = 'progress-bar progress-bar-striped laranja';
            barraProgresso.style.width = `${temporizador / 60 * 100}%`;
        } else if (temporizador > 0) {
            barraProgresso.className = 'progress-bar progress-bar-striped vermelha';
            barraProgresso.style.width = `${temporizador / 60 * 100}%`;
        } else {
            barraProgresso.className = 'progress-bar progress-bar-striped cinza';
            barraProgresso.style.width = '0%';
            clearInterval(intervalo);
            botaoReiniciar.style.display = 'block';
        }
    }, 1000);
}

iniciarTemporizador();

botaoReiniciar.addEventListener('click', () => {
    temporizador = 60;
    document.getElementById('temporizador').innerText = temporizador;
    barraProgresso.className = 'progress-bar progress-bar-striped azul';
    barraProgresso.style.width = '100%';
    botaoReiniciar.style.display = 'none';
    iniciarTemporizador();
});