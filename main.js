const planetas = [
    //                                                             10^6km             km/s,              anos terrestres  km
    { nome: "Mercúrio",  cor: "#8E9BB3",  tipo: "Rochoso",         distancia: 57.9,   velocidade: 47.4,  periodo: 0.24,   diametro: 4879,    composicao: "Silicatos e núcleo de ferro e níquel"                       }, 
    { nome: "Vênus",     cor: "#FFE68A",  tipo: "Rochoso",         distancia: 108.2,  velocidade: 35.0,  periodo: 0.62,   diametro: 12104,   composicao: "Silicatos e ferro,  com atmosfera de CO₂"                   }, 
    { nome: "Terra",     cor: "#38E39A",  tipo: "Rochoso",         distancia: 149.6,  velocidade: 29.8,  periodo: 1.0,    diametro: 12742,   composicao: "Silicatos e ferro,  com 71% da superfície coberta por água" }, 
    { nome: "Marte",     cor: "#FF8FA0",  tipo: "Rochoso",         distancia: 227.9,  velocidade: 24.1,  periodo: 1.88,   diametro: 6779,    composicao: "Silicatos e óxido de ferro"                                 }, 
    { nome: "Júpiter",   cor: "#FFB86B",  tipo: "Gigante gasoso",  distancia: 778.5,  velocidade: 13.1,  periodo: 11.86,  diametro: 139820,  composicao: "Hidrogênio e hélio"                                         }, 
    { nome: "Saturno",   cor: "#D6E7FF",  tipo: "Gigante gasoso",  distancia: 1434,   velocidade: 9.7,   periodo: 29.46,  diametro: 116460,  composicao: "Hidrogênio e hélio"                                         }, 
    { nome: "Urano",     cor: "#4FDDF7",  tipo: "Gigante gelado",  distancia: 2871,   velocidade: 6.8,   periodo: 84.0,   diametro: 50724,   composicao: "Gelos de água,  amônia e metano"                            }, 
    { nome: "Netuno",    cor: "#8CC8FF",  tipo: "Gigante gelado",  distancia: 4495,   velocidade: 5.4,   periodo: 164.8,  diametro: 49244,   composicao: "Gelos de água,  amônia e metano"                            }
];

const paleta = ["#FF8FA0", "#FFE68A", "#38E39A", "#4FDDF7", "#C9A0FF", "#8CC8FF", "#8FA9DA", "#D6E7FF"];

function corAleatoria() {
    return paleta[Math.floor(Math.random() * paleta.length)];
}

const formulario      = document.getElementById("formPlaneta");
const campoNome       = document.getElementById("nome");
const campoTipo       = document.getElementById("tipo");
const campoDistancia  = document.getElementById("distancia");
const campoVelocidade = document.getElementById("velocidade");
const campoPeriodo    = document.getElementById("periodo");
const campoDiametro   = document.getElementById("diametro");
const campoCor        = document.getElementById("cor");
const campoComposicao = document.getElementById("composicao");
const corpoTabela     = document.getElementById("corpoTabela");

campoCor.value = corAleatoria();

// Evita que texto digitado vire HTML na tabela
function limpar(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

function formatar(numero) {
    return numero.toLocaleString("pt-BR");
}

function formatarPeriodo(anos) {
    if (anos < 1) {
        return formatar(Math.round(anos * 365)) + " dias";
    }
    return formatar(anos) + (anos === 1 ? " ano" : " anos");
}

function exibir() {
    corpoTabela.innerHTML = "";

    for (let posicao = 0; posicao < planetas.length; posicao++) {
        const planeta = planetas[posicao];
        corpoTabela.innerHTML += `
            <tr>
                <td>${posicao + 1}º</td>
                <td class="nome-planeta"><span class="ponto" style="background:${planeta.cor}"></span>${limpar(planeta.nome)}</td>
                <td>${limpar(planeta.tipo)}</td>
                <td class="num">${formatar(planeta.distancia)}</td>
                <td class="num">${formatar(planeta.velocidade)}</td>
                <td class="num">${formatarPeriodo(planeta.periodo)}</td>
                <td class="num">${formatar(planeta.diametro)}</td>
                <td>${limpar(planeta.composicao)}</td>
            </tr>
        `;
    }
}

exibir();

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const planeta = {
        nome: campoNome.value,
        tipo: campoTipo.value,
        distancia: Number(campoDistancia.value),
        velocidade: Number(campoVelocidade.value),
        periodo: Number(campoPeriodo.value),
        diametro: Number(campoDiametro.value),
        cor: campoCor.value,
        composicao: campoComposicao.value
    };

    planetas.push(planeta);
    // Mantém a tabela em ordem de distância do Sol
    planetas.sort(function (a, b) {
        return a.distancia - b.distancia;
    });

    exibir();
    formulario.reset();
    campoCor.value = corAleatoria();
    campoNome.focus();
});
