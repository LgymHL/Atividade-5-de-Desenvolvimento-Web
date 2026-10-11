# Pokédex e Localizador de CEP

Projeto desenvolvido como atividade prática de desenvolvimento web com HTML, CSS e JavaScript. A ideia foi reunir os exercícios em uma única página, com uma interface inspirada na Pokédex, para deixar a apresentação mais organizada e agradável de usar.

O projeto trabalha com validação de dados, manipulação de arrays e objetos, consumo de APIs, programação assíncrona e atualização de elementos HTML com JavaScript.

## Funcionalidades

### 1. Validação de pedidos em JavaScript

A primeira parte da atividade consiste em validar pedidos armazenados em um array de objetos. A lógica verifica se cada pedido possui um nome de cliente preenchido e um valor numérico maior que zero.

Depois, são filtrados os pedidos válidos com status `pago`, calculado o total faturado utilizando o método `reduce()` e exibidos os pedidos no formato `Bia — R$ 120.00`, utilizando `toFixed(2)`.

Essa parte não possui interface visual, pois foi desenvolvida como exercício de lógica. Os resultados aparecem no console do navegador: pressione `F12` e acesse a aba **Console**.

### 2. Buscador de CEP

O buscador de CEP permite consultar informações de um endereço a partir de um CEP informado pelo usuário. Para isso, utiliza a API [ViaCEP](https://viacep.com.br/).

Principais funcionalidades:

* Validação do CEP para aceitar exatamente oito dígitos.
* Utilização de `trim()` para remover espaços desnecessários e de expressões regulares (regex) para validar o formato.
* Consumo da API utilizando `fetch()` e `async/await`.
* Exibição de mensagens durante o carregamento e em situações de erro.
* Identificação de CEPs não encontrados.
* Exibição de rua, bairro, cidade e UF.
* Armazenamento dos CEPs encontrados em um array de objetos.
* Exibição de um histórico das consultas realizadas durante a utilização da página.

Durante a busca, o botão é desabilitado para evitar novos envios enquanto a consulta está em andamento.

### 3. Mini Pokédex

A Mini Pokédex permite pesquisar Pokémon pelo nome utilizando a [PokéAPI](https://pokeapi.co/).

Principais funcionalidades:

* Validação para impedir pesquisas com o campo vazio.
* Conversão do nome informado para letras minúsculas.
* Consumo da API utilizando `fetch()` e `async/await`.
* Exibição do nome e da imagem do Pokémon.
* Apresentação dos tipos do Pokémon com etiquetas coloridas.
* Tratamento de erros de conexão e de Pokémon não encontrado.

As cores das etiquetas são definidas no JavaScript de acordo com o tipo de cada Pokémon, contribuindo para a identificação visual das informações.

#### Pokémon para testar

Digite um dos nomes abaixo no campo da Mini Pokédex. Os nomes estão agrupados pelo tipo para facilitar os testes.

| Tipo | Pokémon para testar |
|---|---|
| Normal | `eevee`, `snorlax` |
| Fogo | `charmander`, `charizard` |
| Água | `squirtle`, `psyduck` |
| Elétrico | `pikachu`, `raichu` |
| Grama | `bulbasaur`, `venusaur` |
| Gelo | `articuno`, `lapras` |
| Lutador | `machop`, `machamp` |
| Veneno | `ekans`, `arbok` |
| Terra | `sandshrew`, `geodude` |
| Voador | `pidgey`, `butterfree` |
| Psíquico | `abra`, `alakazam`, `mewtwo` |
| Inseto | `caterpie`, `scizor` |
| Pedra | `onix`, `geodude` |
| Fantasma | `gastly`, `gengar` |
| Dragão | `dragonite`, `garchomp` |
| Sombrio | `umbreon` |
| Aço | `steelix`, `scizor` |
| Fada | `clefable`, `sylveon` |

**Dica:** alguns Pokémon têm mais de um tipo. Por exemplo, o `gengar` aparece como Fantasma e Veneno, e o `dragonite` como Dragão e Voador.

## Tecnologias utilizadas

* **HTML5:** estrutura da página, formulários, campos de busca e áreas de resultados.
* **CSS3:** estilização da interface, cores, espaçamentos, botões e elementos visuais inspirados na Pokédex.
* **JavaScript:** validação de dados, manipulação de arrays e objetos, criação de elementos HTML e atualização dinâmica da página.
* **Fetch API:** realização de requisições para serviços externos.
* **Async/await e Promises:** gerenciamento de operações assíncronas.
* **Expressões regulares (regex):** validação do formato do CEP.
* **ViaCEP:** consulta de informações de endereço.
* **PokéAPI:** consulta de informações sobre Pokémon.

## Organização dos arquivos

```text
projeto/
├── index.html
├── style.css
├── app.js
└── pokebola/
    └── Poké_Ball_icon.svg.webp
```

* `index.html`: contém a estrutura da página e os formulários.
* `style.css`: define a aparência e a organização visual do site.
* `app.js`: contém a lógica de validação de pedidos, busca de CEP e Mini Pokédex.
* `pokebola/`: contém a imagem utilizada no cabeçalho da página.

**Observação:** mantenha os arquivos nos caminhos indicados no HTML para que os estilos, os scripts e a imagem sejam carregados corretamente.

## Como executar o projeto

1. Baixe ou clone o repositório.
2. Mantenha os arquivos e as pastas organizados conforme a estrutura apresentada.
3. Abra o arquivo `index.html` no navegador. Se preferir, utilize a extensão Live Server no Visual Studio Code.
4. Para utilizar o buscador de CEP e a Mini Pokédex, tenha conexão com a internet, pois as consultas dependem de APIs externas.
5. Para ver os resultados da validação de pedidos, abra o console do navegador (`F12`) assim que a página carregar.

## Reflexão: por que `Promise.all()` pode ser mais rápido que vários `await` seguidos?

Quando uso vários `await` um depois do outro, o JavaScript espera a primeira operação terminar para só então começar a próxima. Se eu tiver três consultas à internet, por exemplo, a segunda só começa depois que a primeira terminar, e a terceira precisa esperar a segunda. Isso pode fazer o processo demorar mais.

Já com `Promise.all()`, consigo iniciar várias operações assíncronas ao mesmo tempo e esperar todas terminarem. Como as requisições acontecem em paralelo, o tempo total pode ser menor, principalmente quando elas dependem da rede.

Só tem um detalhe: o `Promise.all()` espera que todas as Promises sejam concluídas com sucesso para entregar os resultados. Se uma delas falhar, a Promise retornada por ele será rejeitada. Além disso, essa abordagem funciona melhor quando as operações são independentes, ou seja, quando uma não precisa do resultado da outra para começar.

Resumindo, usar vários `await` seguidos pode fazer uma operação esperar a outra sem necessidade. Com `Promise.all()`, quando as tarefas podem acontecer ao mesmo tempo, aproveito melhor esse tempo e obtenho os resultados mais rapidamente.

Esse conteúdo foi visto nas duas últimas aulas, e foi bem compreendido.

## Objetivo da atividade

Praticar conceitos fundamentais de JavaScript no desenvolvimento web, incluindo validação de dados, filtragem de informações, cálculo de valores, consumo de APIs, tratamento de erros e manipulação dinâmica do HTML.

O CSS foi utilizado para melhorar a apresentação visual das funcionalidades que possuem interface, reunindo o buscador de CEP e a Mini Pokédex em uma página organizada.

---

O projeto foi feito principalmente para praticar os estudos vistos em sala de aula e para me desenvolver cada vez mais como programador.
