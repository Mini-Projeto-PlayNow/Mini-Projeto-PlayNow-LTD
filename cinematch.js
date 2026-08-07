(function () {
  const catalogo = require("./catalogo");
  const prompt = require("prompt-sync")();
  let usuario = null;
  let opcao = null;
  do {
    console.log("\n===== CineMatch JS =====");
    console.log("0 - criar meu perfil");
    console.log("1 - Ver meu perfil");
    console.log("2 - Ver catálogo completo");
    console.log("3 - Calcular compatibilidade com todos os conteúdos");
    console.log("4 - Ver o conteúdo mais recomendado");
    console.log("5 - Sair");
    opcao = prompt("Escolha uma opção: ");
    switch (opcao) {
      case "0":
        usuario = criarPerfil();
        break;
      case "1":
        exibirPerfil(usuario);
        break;
      case "2":
        exibirCatalogo(catalogo);
        break;
      case "3":
        calcularCompatibilidades(usuario,catalogo);
        break;
      case "4":
        exibirRecomendacaoPrincipal(usuario,catalogo);
        break;
      case "5":
        console.log("Até a próxima maratona!");
        break;
      default:
        console.log("Opção inválida, tente novamente.");
        break;
    }
  } while (opcao !== "5");
  function criarPerfil() {
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
    return usuario;
  }
  function exibirPerfil(usuario) {
    if (usuario == null) {
      console.log("nenhum perfil de usuario encontrado. Crie um perfil.");
    } else {
      console.log(
        `Nome: ${usuario.nome} \n Idade: ${usuario.idade} \n Generos favoritos: ${usuario.generosFavoritos}`,
      );
    }
  }
  function exibirCatalogo(catalogo) {
    console.log(catalogo);

  }
function calcularCompatibilidades(usuario, catalogo) {
    if (usuario == null) {
      console.log("nenhum perfil de usuário encontrado. Crie um perfil.");
      return;
      
      }
    };
  
  }
  // ------------------------------------------------------------------------------
})();
