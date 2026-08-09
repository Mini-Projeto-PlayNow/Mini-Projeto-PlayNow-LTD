const catalogo = require("./catalogo");
const prompt = require("prompt-sync")();
const { Conteudo, Serie, Filme } = require("./class");

let usuario = null;

function menu(usuario, catalogo) {
  do {
    console.clear();
    console.log("\n================ CineMatch =================");
    console.log("0 - Criar meu perfil");
    console.log("1 - Ver meu perfil");
    console.log("2 - Ver catálogo completo");
    console.log("3 - Calcular compatibilidade com todos os conteúdos");
    console.log("4 - Ver o conteúdo mais recomendado");
    console.log("5 - Excluir meu perfil");
    console.log("6 - Sair");
    console.log("=============================================");
    if (!usuario) {
      console.log("Nenhum perfil de usuario encontrado. Crie um perfil.");
      console.log("=============================================\n");
    } else {
      console.log(`Usuário logado: ${usuario.nome}`);
      console.log("=============================================\n");
    }
    opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
      case "0":
        usuario = criarPerfil(usuario);
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
        defaultMenu();
        break;
    }
  } while (opcao !== "6");
}

function voltarMenu() {
  let voltarMenu;
  do {
    voltarMenu = prompt("Voltar para menu S/N: ");
  } while (voltarMenu.toUpperCase() !== "S");
}

function criarPerfil(usuario) {
  console.clear();
  console.log("\n========= CineMatch - Criar Perfil ========\n");
  if (!usuario) {
    const nome = formatarNome(prompt("Qual é o seu nome? "));
    let idade;
    idade = Number(prompt("Qual é a sua idade? "));
    if (Number.isNaN(idade)) {
      console.log("Digite uma idade válida!");
      idade = Number(prompt("Qual é a sua idade? "));
    }
    const generosInput = prompt(
      "Quais gêneros você mais gosta? (separe por vírgula, ex: Ação, Comédia, Terror): ",
    );

    const generosFavoritos = generosInput
      .split(",")
      .map((genero) => padronizarGenero(genero))
      .filter(Boolean);

    const novoUsuario = {
      nome: nome,
      idade: idade,
      generosFavoritos: generosFavoritos,
    };

    return (usuario = novoUsuario);
  } else {
    console.log(
      "Usuário já cadastrado, para cadastrar novo usuário volte ao menu e exclua o atual!\n",
    );
    console.log("=============================================\n");
    voltarMenu();
    return usuario;
  }
  voltarMenu();
}

function exibirPerfil(usuario) {
  console.clear();
  console.log("\n======== CineMatch - Exibir Perfil ========\n");
  if (!usuario) {
    console.log("Nenhum perfil de usuario encontrado. Crie um perfil.\n");
  } else {
    console.log(
      `Nome: ${usuario.nome} \nIdade: ${usuario.idade} \nGeneros favoritos: ${usuario.generosFavoritos.join(", ")}\n`,
    );
  }

  voltarMenu();
}

function exibirCatalogo(catalogo) {
  console.clear();
  console.log(catalogo);
  console.log("");
  voltarMenu();
}

function formatarNome(nome) {
  return nome
    .trim()
    .split(/\s+/)
    .map(
      (parte) => parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase(),
    )
    .join(" ");
}

function padronizarGenero(genero) {
  const generosPadronizados = {
    acao: "Ação",
    aventura: "Aventura",
    animacao: "Animação",
    comedia: "Comédia",
    crime: "Crime",
    drama: "Drama",
    familia: "Família",
    fantasia: "Fantasia",
    "ficcao cientifica": "Ficção científica",
    faroeste: "Faroeste",
    misterio: "Mistério",
    musical: "Musical",
    romance: "Romance",
    suspense: "Suspense",
    terror: "Terror",
  };

  const chaveNormalizada = normalizarTexto(genero);
  return generosPadronizados[chaveNormalizada] || formatarNome(genero);
}

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function compatibilidade(usuario, catalogo) {
  const resultado = catalogo.map((conteudo) => {
    const generosFavoritosNormalizados =
      usuario.generosFavoritos.map(normalizarTexto);

    const generosEmComum = conteudo.generos.filter((genero) =>
      generosFavoritosNormalizados.includes(normalizarTexto(genero)),
    );
    const match = generosEmComum.length / conteudo.generos.length;
    const porCento = (match * 100).toFixed(0);

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
  return resultado;
}

function calcularCompatibilidades(usuario, catalogo) {
  console.clear();
  console.log("\n=== CineMatch - Calcular Compatibilidades ===\n");
  if (!usuario) {
    console.log("Nenhum perfil de usuário encontrado. Crie um perfil.\n");
  } else {
    const resultado = compatibilidade(usuario, catalogo);
    for (i = 0; i < resultado.length; i++) {
      console.log(`
        Título: ${resultado[i].titulo}
        Tipo: ${resultado[i].tipo}
        Compatibilidade: ${resultado[i].compatibilidade}%
        Gêneros em comum: ${resultado[i].generosEmComum.join(", ")}
        Afinidade ${resultado[i].afinidade}
        `);
    }
    let voltarMenu;
    do {
      voltarMenu = prompt("Voltar para menu S/N: ");
    } while (voltarMenu.toUpperCase() !== "S");
    return resultado;
  }
}

function exibirRecomendacaoPrincipal(usuario, catalogo) {
  console.clear();
  console.log("\n======== CineMatch - Recomendação Principal ========");
  const resultados = compatibilidade(usuario, catalogo);
  const resultado = resultados.find(
    (recomendacao) => Number(recomendacao.compatibilidade) === 100,
  );

  if (!resultado) {
    console.log("\nNenhum conteúdo com compatibilidade total foi encontrado.");
    console.log("\n====================================================\n");
  } else {
    console.log(`
    Conteúdo mais recomendado: 
    Título: ${resultado.titulo}
    Tipo: ${resultado.tipo}
    Compatibilidade: ${resultado.compatibilidade}%
    Gêneros em comum: ${resultado.generosEmComum.join(", ")}
    Afinidade ${resultado.afinidade}
        `);
    console.log("====================================================\n");
  }

  voltarMenu();
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
  voltarMenu();
  return usuario;
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

function defaultMenu() {
  console.log("Opção inválida, tente novamente.");
  voltarMenu();
}

//Início programa.

menu(usuario, catalogo);
