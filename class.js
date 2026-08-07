class Conteudo {
    constructor(titulo, tipo, generos, duracaoMinutos) {
        this.titulo = titulo;
        this.tipo = tipo;
        this.generos = generos;
        this.duracaoMinutos = duracaoMinutos;
    }

    exibirResumo() {
        return `${this.titulo} (${this.tipo}) — ${this.duracaoMinutos} min`;
    }
}

class Serie extends Conteudo {
    constructor(titulo, generos, duracaoMinutos, temporadas) {
        super(titulo, "Série", generos, duracaoMinutos);
        this.temporadas = temporadas;
    }

    exibirTemporadas() {
        return `${this.titulo} tem ${this.temporadas} temporada(s)`;
    }
}

class Filme extends Conteudo {
    constructor(titulo, generos, duracaoMinutos) {
        super(titulo, "Filme", generos, duracaoMinutos);
    }
}
