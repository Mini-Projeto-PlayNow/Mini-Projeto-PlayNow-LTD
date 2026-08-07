const x = {
  titulo: "De Volta para o Futuro",
  tipo: "filme",
  generos: ["Ficção científica", "aventura", "comédia","fantasia"],
  duracaoMinutos: 116,
};

const s = ["terror", "comédia", "fantasia"];
function compatibilidade(generosFavoritos, item) {
  let contador = 0;

  for (let i = 0; i < item.generos.length; i++) {
    const itemGenero = item.generos[i];
    const ehFavorito = generosFavoritos.includes(itemGenero);
    if (ehFavorito === true) {
      contador++;
    }
  }
    const match = contador/generosFavoritos.length
    const porCento = `${(match*100).toFixed(0)}%`
  console.log(porCento);
}
 compatibilidade(s, x);