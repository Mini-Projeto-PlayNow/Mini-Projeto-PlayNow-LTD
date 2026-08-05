const prompt = require("prompt-sync")();

// RF15 – Criar um menu interativo com opções 
// Depois do onboarding (perfil + catálogo carregado), o sistema deverá exibir um menu de 
// opções no terminal, repetindo a pergunta até a pessoa usuária escolher sair. Exemplo de 
// menu: 
// ===== CineMatch JS ===== 
// 1 - Ver meu perfil 
// 2 - Ver catálogo completo 
// 3 - Calcular compatibilidade com todos os conteúdos 
// 4 - Ver o conteúdo mais recomendado 
// 5 - Sair 

// O menu deverá usar um laço de repetição (recomendado: do-while, pois o menu precisa ser 
// exibido pelo menos uma vez) combinado com switch-case (ou if-else) para decidir o que 
// fazer a cada opção escolhida. Exemplo:  
// let opcao; 

// do { 
//   console.log("\n===== CineMatch JS ====="); 
//   console.log("1 - Ver meu perfil"); 
//   console.log("2 - Ver catálogo completo"); 
//   console.log("3 - Calcular compatibilidade com todos os 
//   conteúdos"); 
//   console.log("4 - Ver o conteúdo mais recomendado"); 
//   console.log("5 - Sair");

opcao = prompt("Escolha uma opção: ");

do {
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