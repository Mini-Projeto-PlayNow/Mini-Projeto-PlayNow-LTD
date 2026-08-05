const prompt = require("prompt-sync")();

do {
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
