const prompt = require("prompt-sync")();

do {
  console.log("\n===== CineMatch JS =====");
  console.log("1 - Ver meu perfil");
  console.log("2 - Ver catálogo completo");
  console.log("3 - Calcular compatibilidade com todos os conteúdos");
  console.log("4 - Ver o conteúdo mais recomendado");
  console.log("5 - Sair");
  opcao = prompt("Escolha uma opção: ");
  switch (opcao) {
    case "1":
      exibirPerfil(usuario);
      break;
    case "2":
      exibirCatalogo(catalogo);
      break;
    case "3":
      calcularCompatibilidades(usuario, catalogo);
      break;
    case "4":
      exibirRecomendacaoPrincipal(usuario, catalogo);
      break;
    case "5":
      console.log("Até a próxima maratona!");
      break;
    default:
      console.log("Opção inválida, tente novamente.");
      break;
  }
} while (opcao !== "5");

// Cada opção do menu deverá chamar funções já criadas para os outros requisitos (RF03 a
// RF07) — o menu é só a porta de entrada, não é necessário duplicar lógica.

// RF01 – Criar o perfil da pessoa usuária via terminal (interativo)
// O  projeto  deverá  capturar  os  dados  da  pessoa  usuária  digitados  no  terminal,  usando  a
// biblioteca prompt-sync. Exemplo:

// const prompt = require('prompt-sync')({ sigint: true });
// Lembrando, no fim será um Objeto Simples (usuario)
// A pessoa usuária poderá digitar qualquer nome e qualquer combinação de gêneros — o
// sistema  deve  funcionar  corretamente  com  respostas  diferentes,  e  não  apenas  com  o
// exemplo acima.
const exibirPerfil = (usuario) => {
  return console.log(
    `Nome: ${usuario.nome} \n Idade: ${usuario.idade} \n Generos favoritos: ${usuario.generosFavoritos}`,
  );
};

const nome = prompt("Qual é o seu nome? ");
const idade = Number(prompt("Qual é a sua idade? "));
const generosInput = prompt(
  "Quais gêneros você mais gosta? (separe por vírgula, ex: Ação, Comédia, Terror): ",
);

const usuario = {
  nome: nome,
  idade: idade,
  generosFavoritos: generosInput.split(",").map((g) => g.trim()),
};

console.log(exibirPerfil(usuario));
