function saudacao(nome, callback) {
  console.log("olá, " + nome + " seja bem-vindo(a) a playnow LTD!");
  callback();
}
function despedida () {
    console.log ("Até a próxima maratona!");
}
saudacao("nome", despedida);
