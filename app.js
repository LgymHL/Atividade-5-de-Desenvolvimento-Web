//validação de pedidos

// const pedidos = [
//   { cliente: "Bia", valor: 120, status: "pago" },
//   { cliente: "", valor: 80, status: "pago" },
//   { cliente: "Caio", valor: -50, status: "pago" },
//   { cliente: "Duda", valor: 200, status: "pendente" },
//   { cliente: "Eva", valor: 60.5, status: "pago" },
// ];

// function pedidoValido(pedido) {
//   return (
//     pedido.cliente.trim() !== "" &&
//     typeof pedido.valor === "number" &&
//     pedido.valor > 0
//   );
// }

// const pedidosValidos = pedidos.filter(pedidoValido);
// const pedidosPagos = pedidosValidos.filter((pedido) => pedido.status === "pago");
// const totalFaturado = pedidosPagos.reduce(
//   (acumulador, pedido) => acumulador + pedido.valor,
//   0
// );

// pedidosPagos.forEach((pedido) => {
//   console.log(`${pedido.cliente} — R$ ${pedido.valor.toFixed(2)}`);
// });

// console.log("Total faturado:", totalFaturado.toFixed(2));

// -----------------------------------------------------

//Buscador de Cep

const historicoCeps = [];

function renderizarHistoricoCep() {
  const historicoLista = document.querySelector("#historico-cep");
  historicoLista.replaceChildren();

  historicoCeps.forEach((item) => {
    const linha = document.createElement("li");
    linha.textContent = `${item.cep} — ${item.cidade}/${item.uf}`;
    historicoLista.append(linha);
  });
}

async function buscarCep(cep) {
  const statusCep = document.querySelector("#status-cep");
  const resultadoCep = document.querySelector("#resultado-cep");
  const botaoCep = document.querySelector("#botao-cep");

  statusCep.textContent = "Buscando...";
  statusCep.classList.remove("erro");
  botaoCep.disabled = true;
  resultadoCep.replaceChildren();

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      signal: AbortSignal.timeout(5000),
    });

    if (!resposta.ok) {
      throw new Error("Erro na requisição");
    }

    const dados = await resposta.json();

    if (dados.erro) {
      statusCep.textContent = "CEP não encontrado.";
      statusCep.classList.add("erro");
      return;
    }

    statusCep.textContent = "";

    const campos = [
      ["Rua", dados.logradouro],
      ["Bairro", dados.bairro],
      ["Cidade", dados.localidade],
      ["UF", dados.uf],
    ];

    campos.forEach(([rotulo, valor]) => {
      const termo = document.createElement("dt");
      termo.textContent = rotulo;
      const definicao = document.createElement("dd");
      definicao.textContent = valor || "-";
      resultadoCep.append(termo, definicao);
    });

    historicoCeps.push({ cep, cidade: dados.localidade, uf: dados.uf });
    renderizarHistoricoCep();
  } catch (erro) {
    statusCep.textContent = "Falha na conexão. Tente novamente.";
    statusCep.classList.add("erro");
  } finally {
    botaoCep.disabled = false;
  }
}

const formularioCep = document.querySelector("#formulario-cep");
const inputCep = document.querySelector("#input-cep");

formularioCep.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const statusCep = document.querySelector("#status-cep");
  const cep = inputCep.value.trim();

  if (!/^\d{8}$/.test(cep)) {
    statusCep.textContent = "CEP inválido. Digite 8 números.";
    statusCep.classList.add("erro");
    return;
  }

  buscarCep(cep);
});

//-----------------------------------------------------

//Pokédex

const CORES_TIPOS = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

async function buscarPokemon(nome) {
  const statusPokemon = document.querySelector("#status-pokemon");
  const resultadoPokemon = document.querySelector("#resultado-pokemon");
  const botaoPokemon = document.querySelector("#botao-pokemon");

  statusPokemon.textContent = "Buscando...";
  statusPokemon.classList.remove("erro");
  botaoPokemon.disabled = true;
  resultadoPokemon.replaceChildren();

  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`, {
      signal: AbortSignal.timeout(5000),
    });

    if (resposta.status === 404) {
      statusPokemon.textContent = "Pokémon não encontrado.";
      statusPokemon.classList.add("erro");
      return;
    }

    if (!resposta.ok) {
      throw new Error("Erro na requisição");
    }

    const dados = await resposta.json();

    statusPokemon.textContent = "";

    const titulo = document.createElement("h3");
    titulo.textContent = dados.name;

    const imagem = document.createElement("img");
    imagem.id = "pokemon-imagem";
    imagem.src = dados.sprites.front_default;
    imagem.alt = dados.name;

    const tipos = document.createElement("div");
    tipos.classList.add("tipos");

    dados.types.forEach((tipoInfo) => {
      const nomeTipo = tipoInfo.type.name;
      const badge = document.createElement("span");
      badge.classList.add("tipo-badge");
      badge.style.backgroundColor = CORES_TIPOS[nomeTipo] || "#777777";
      badge.textContent = nomeTipo;
      tipos.append(badge);
    });

    resultadoPokemon.append(titulo, imagem, tipos);
  } catch (erro) {
    statusPokemon.textContent = "Falha na conexão. Tente novamente.";
    statusPokemon.classList.add("erro");
  } finally {
    botaoPokemon.disabled = false;
  }
}

const formularioPokemon = document.querySelector("#formulario-pokemon");
const inputPokemon = document.querySelector("#input-pokemon");

formularioPokemon.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const statusPokemon = document.querySelector("#status-pokemon");
  const nome = inputPokemon.value.trim().toLowerCase();

  if (nome === "") {
    statusPokemon.textContent = "Digite um nome de Pokémon.";
    statusPokemon.classList.add("erro");
    return;
  }

  buscarPokemon(nome);
});