var convidados = JSON.parse(localStorage.getItem("convidados")) || [];

var elLista = document.getElementById("lista");
var elId = document.getElementById("cId");
var elNome = document.getElementById("cNome");
var elIdade = document.getElementById("cIdade");
var elBotao = document.getElementById("botao");

elBotao.onclick = function (){
    var id = elId.value;
    var nome = elNome.value;
    var idade = elIdade.value;
    convidados.push({id: id, nome: nome, idade: idade});
    elNome.value = elIdade.value = elId.value = "";
    salvarConvidados();
    listarConvidados();

};
function salvarConvidados(){
    localStorage.setItem("convidados", JSON.stringify(convidados));
}
function listarConvidados(){
    elLista.innerHTML= "";
    for (const convidado of convidados){
        var elConvidado = document.createElement('li');
        var elNome = document.createTextNode("Nome: " + convidado.nome + " | ");
        var elId = document.createTextNode("id: " + convidado.id + " | ");
        var elIdade = document.createTextNode("Idade: " +   convidado.idade + " => ");
        
        var elExcluir = document.createElement("a");
        elExcluir.setAttribute("href", "#");
        elExcluir.onclick = function(){
            convidados = convidados.filter(function(item){
                return item.nome !== convidado.nome;
            });
            salvarConvidados();
            listarConvidados();
        }
        var elExcluirText = document.createTextNode("Excluir");
        elExcluir.appendChild(elExcluirText);
        elConvidado.appendChild(elId);
        elConvidado.appendChild(elNome);
        elConvidado.appendChild(elIdade);
        elConvidado.appendChild(elExcluir);
        elLista.appendChild(elConvidado);
    }
}
listarConvidados();