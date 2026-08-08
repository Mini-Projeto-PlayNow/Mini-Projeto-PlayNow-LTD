const catalogo = require("./catalogo");
const prompt = require("prompt-sync")();
const { Conteudo, Serie, Filme } = require("./class");

let usuario = null;

function menu(usuario, catalogo) {
  do {
    console.clear();
    console.log(usuario);
    console.log("\n================ CineMatch =================");
    console.log("0 - Criar meu perfil");
    console.log("1 - Ver meu perfil");
    console.log("2 - Ver catálogo completo");
    console.log("3 - Calcular compatibilidade com todos os conteúdos");
    console.log("4 - Ver o conteúdo mais recomendado");
    console.log("5 - Excluir meu perfil");
    console.log("6 - Sair");
    console.log("=============================================\n");
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
        calcularCompatibilidades(usuario, catalogo);
        break;
      case "4":
        exibirRecomendacaoPrincipal(usuario, catalogo);
        break;
      case "5":
        usuario = excluirPerfil(usuario);
        break;
      case "6":
        saudacaoDespedida(usuario, despedida);
        break;
      default:
        console.log("Opção inválida, tente novamente.");
        let voltarMenu;
        do {
          voltarMenu = prompt("Voltar para menu S/N: ");
        } while (voltarMenu.toUpperCase() !== "S");
    }
  } while (opcao !== "6");
}

function saudacaoDespedida(usuario, callback) {
  console.clear();
  console.log("\n================ CineMatch =================");
  if (usuario) {
    console.log(`\nObrigado por usar nossos serviços, ${usuario.nome}!`);
  } else {
    console.log("\nObrigado por usar nossos serviços!");
  }
  callback();
  console.log("\n=============================================\n");
}
function despedida() {
  console.log("Até a próxima maratona!");
}

function criarPerfil() {
  console.clear();
  console.log("\n========= CineMatch - Criar Perfil ========\n");
  const nome = prompt("Qual é o seu nome? ");
  const idade = Number(prompt("Qual é a sua idade? "));
  const generosInput = prompt(
    "Quais gêneros você mais gosta? (separe por vírgula, ex: Ação, Comédia, Terror): ",
  );

  const novoUsuario = {
    nome: nome,
    idade: idade,
    generosFavoritos: generosInput.split(",").map((g) => g.trim()),
  };

  return (usuario = novoUsuario);
}

function exibirPerfil(usuario) {
  console.clear();
  console.log("\n======== CineMatch - Exibir Perfil ========\n");
  if (!usuario) {
    console.log("Nenhum perfil de usuario encontrado. Crie um perfil.\n");
  } else {
    console.log(
      `Nome: ${usuario.nome} \nIdade: ${usuario.idade} \nGeneros favoritos: ${usuario.generosFavoritos}\n`,
    );
  }

  let voltarMenu;
  do {
    voltarMenu = prompt("Voltar para menu S/N: ");
  } while (voltarMenu.toUpperCase() !== "S");
}

function exibirCatalogo(catalogo) {
  console.clear();
  console.log(catalogo);
  console.log("");
  let voltarMenu;
  do {
    voltarMenu = prompt("Voltar para menu S/N: ");
  } while (voltarMenu.toUpperCase() !== "S");
}

function calcularCompatibilidades(usuario, catalogo) {
  console.clear();
  console.log("\n=== CineMatch - Calcular Compatibilidades ===\n");
  if (!usuario) {
    console.log("Nenhum perfil de usuário encontrado. Crie um perfil.\n");
  } else {
    let contador = 0;

    const resultado = catalogo.map((conteudo) => {
      const generosEmComum = conteudo.generos.filter((genero) =>
        usuario.generosFavoritos.includes(genero),
      );
      const match = generosEmComum.length / conteudo.generos.length;
      const porCento = (match * 100).toFixed(0);
      console.log(porCento);

      let afinidade;
      if (Number(porCento) >= 80) {
        afinidade = "Alta afinidade";
      } else if (Number(porCento) >= 50) {
        afinidade = "Média afinidade";
      } else {
        afinidade = "Baixa afinidade";
      }

      return {
        titulo: conteudo.titulo,
        tipo: conteudo.tipo,
        compatibilidade: porCento,
        generosEmComum: generosEmComum,
        afinidade: afinidade,
      };
    });

    console.log(resultado);
  }
  let voltarMenu;
  do {
    voltarMenu = prompt("Voltar para menu S/N: ");
  } while (voltarMenu.toUpperCase() !== "S");
}

function excluirPerfil(usuario) {
  console.clear();
  console.log("\n========= CineMatch - Excluir Perfil ========\n");
  let excluirPerfil;
  if (!usuario) {
    console.log("Nenhum perfil de usuario encontrado. Crie um perfil.\n");
  } else {
    do {
      excluirPerfil = prompt("Excluir perfil? S/N: ");
      if (excluirPerfil.toUpperCase() === "S") {
        usuario = null;
      }
    } while (excluirPerfil.toUpperCase() !== "S");
  }
  console.log("");
  let voltarMenu;
  do {
    voltarMenu = prompt("Voltar para menu S/N: ");
  } while (voltarMenu.toUpperCase() !== "S");
  return usuario;
}

//Início programa.

menu(usuario, catalogo);
