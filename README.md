# Desafio Front-End do FreeCodeCamp - Máquina de Citação

Vamos começar nosso projeto Front-End pro FreeCodeCamp  
Criaremos uma máquina de citações aleatórias  
Conhecimento demonstrado:
1. Redux
   1. Tipos das ações
   2. Criadores das ações
   3. Reducers
   4. Store
   5. Mapeamento
2. React
   1. Componentes
3. React-Redux
   1. Connect
   2. Provider
4. SASS/CSS

## Instalação

Preparação do ambiente de desenvolvimento do projeto

> PS: Para o SASS funcionar precisei usar o Node.js versão 16  
SASS ainda era incompatível com o Node.js versão 18

-instalação do Node.js versão 16, a última que saiu dela  
-criado o projeto inicial do create-react-app com:  
```
npx create-react-app learn-react
```
-instalado o SASS para uma estilização mais fácil com:
```
npm install node-sass
```
> PS: enquanto desenvolvia, houve uma atualização do SASS e sua instalação mudou para:
```
npm install sass
```
-instalado o Redux e o react-redux com:
```
npm i -D redux react-redux
```

## Introdução

Para fins de demonstração do conhecimento aprendido  
Preferi usar componentes **React** junto com repositórios **Redux**  
No código, irei utilizar o acesso restrito ao repositório *Redux*  
Assim, cada componente terá acesso apenas a informação necessária  
Por fim, usarei o **SASS** para estilizar o projeto  

Começo criando 2 componetes para apresentar as citações  
um responsável pelo texto da citação e outro pelo autor  
> PS: sei que poderia usar aoenas 1 mas quero mostrar a restrição ao Redux
> 
Além deles, também temos mais 2 componentes para fazer o tweet da citação  
e outro para mudar a citação para outra aleatória de uma lista  

Cada componente será conectado ao **store** por meio de um *reducer* específico  
e cada *reducer* tratará ações específicas de parte do conteúdo do **store**  

Por fim teremos um repositório **Redux** que guardará todas as informações  
A *citação* e o *autor* ficarão salvos no **Redux** como um objeto  
junto com a lista das citações e das cores disponíveis  

Quero fazer o acesso dos componentes à informação restritivamente  
Assim, *um componente* acessará a *citação* e o outro o *autor*  
o botão de **tweet** terá acesso a ambos para criar um novo tweet  
e o botão de nova citação, às listas de citações e cores para mudá-los  

Apesar de no repositório **Redux** ter apenas um objeto  
cada componente lerá apenas uma parte dele  

## Configurando e instalando os pacotes

Instalando o **Redux** e o **react-redux** descobri que o método *createStore* será descontinuado  
Foi aconselhado a usar o **Redux Toolkit** no lugar do **Redux** padrão  
Para fins de apresentação de aprendizado, continuarei usando o *Redux* padrão  
Futuramente precisarei atualizar o conhecimento para o *Redux Toolkit*  

Ao inspecionar o exemplo fornecido, descobri que a fonte das citações vem de um **JSON**  
Para obter os dados, precisei usar o método **fetch** ao invés do **jQuery.ajax**  
Porém para usar o **fetch** seria necessário instalar outro pacote  
Assim para não ter problemas com o async/await funcionando com o fetch  
Deixei todas as citações em um arquivo como uma lista e os importei  
O mesmo foi feito com uma lista enorme de cores para a escolha aleatória  

Após a criação do projeto padrão React com *"npx create-react-app learn-react"*  
Foi removido todo o desnecessário de dentro do *render()* da função padrão *App*  

Diversos guias, tutoriais e vídeos, mostram a configuração e uso do Redux  
com diversos arquivos, cada um, contendo partes dela  

Para ficar fácil de entender e verificar, podemos encontrar tudo no App.js  

## Iniciando o projeto

Começamos com os tipos das ações e seguimos com os criadores das ações  
```javascript
// actions types
const WRITE_QUOTE = 'WRITE_QUOTE';
const WRITE_AUTHOR = 'WRITE_AUTHOR';
const WRITE_COLOR = 'WRITE_COLOR';
const UPDATE_QUOTES = 'UPDATE_QUOTES';

// actions
const setQuoteQuote = (quote) => {
  return {
    type: WRITE_QUOTE,
    quote: quote
  };
}
const setAuthorQuote = (author) => {
  return {
    type: WRITE_AUTHOR,
    author: author
  };
}
const setListaQuotes = (quotes) => {
  return {
    type: UPDATE_QUOTES,
    quotes: quotes,
  };
}
const setInicialColor = (cor) => {
  return {
    type: WRITE_COLOR,
    color: cor
  };
}
```
Logo depois, temos os reducers para cada componente que tratarão as ações  
```javascript
// reducers
const quoteQuoteReducer = (state = { quote: initial_quote2.quote }, action) => {
  const obj = Object.assign({}, state);
  switch (action.type) {
    case WRITE_QUOTE:
      obj['quote'] = action.quote;
      return obj;
    default:
      return obj;
  }
}
const authorQuoteReducer = (state = { author: initial_quote2.author }, action) => {
  const obj = Object.assign({}, state);
  switch (action.type) {
    case WRITE_AUTHOR:
      obj['author'] = action.author;
      return obj;
    default:
      return obj;
  }
}
const tweetQuoteReducer = (state = { quote: initial_quote2.quote, author: initial_quote2.author }, action) => {
  const obj = Object.assign({}, state);
  switch (action.type) {
    default:
      return obj;
  }
}
const updateQuoteReducer = (state = { quotes: arrayQuotes.quotes, colors: COLOR_ARRAY, color: COLOR_ARRAY[Math.floor(Math.random() * COLOR_ARRAY.length)] }, action) => {
  const obj = Object.assign({}, state);
  switch (action.type) {
    case UPDATE_QUOTES:
      obj['quotes'] = action.quotes;
      return obj;
    case WRITE_COLOR:
      obj['color'] = action.color;
      return obj;
    default:
      return obj;
  }
}
```
A criação do store, repositório único, é feito combinando todos os reducers  
```javascript
// store com reducers combinados
const storeUnique = createStore(combineReducers({
  readQuote: quoteQuoteReducer,
  readAuthor: authorQuoteReducer,
  tweetQuote: tweetQuoteReducer,
  updateQuotes: updateQuoteReducer,
}));
```

Em seguida fazemos o mapeamento do store para o state dos componentes  
No mapeamento é onde definimos qual parte do store ficará disponível pro componente  
Neste primeiro mapeamento é onde restringimos os acessos  
```javascript
// mapeando partes do store para ser acessado pelo componente
const mapQuoteStateToProps = (store) => { return { quote: store.readQuote.quote, color: store.updateQuotes.color } };
const mapAuthorStateToProps = (store) => { return { author: store.readAuthor.author, color: store.updateQuotes.color } };
const mapTweetStateToProps = (store) => { return { quote: store.readQuote.quote, author: store.readAuthor.author, color: store.updateQuotes.color } };
const mapQuotesStateToProps = (store) => { return { quotes: store.updateQuotes.quotes, colors: store.updateQuotes.colors, color: store.updateQuotes.color } };
```
O segundo mapeamento conecta o dispacho das ações criadas aos componentes  
```javascript
// mapeando ações que serão despachadas para o store para atualizá-lo
const mapQuoteDispatchToProps = (dispatch) => { return {} };
const mapAuthorDispatchToProps = (dispatch) => { return {} };
const mapQuotesDispatchToProps = (dispatch) => {
  return {
    setQuote: (quote) => {
      dispatch(setQuoteQuote(quote.quote));
      dispatch(setAuthorQuote(quote.author));
    },
    setQuotes: (quotes) => { dispatch(setListaQuotes(quotes)) },
    setColor: (cor) => { dispatch(setInicialColor(cor)) },
  }
};
```

Com isso terminamos de configurar o necessário pro nosso Redux  
Agora partimos para os componentes que usarão e atualizarão o store do Redux  

## Criação dos componentes

O primeiro componente mostrará o texto da citação  
Nele, renderizamos a citação vindo diretamente do store do Redux  
Deste modo, no momento que a citação for alterada o React o renderizará  
Também temos símbolos de aspas duplas importadas do site FontAwesome  
```javascript
// componente que mostrará o texto da citação
class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // estado abaixo desnecessário
      // quote: 'Texto em construção'
    }
  }
  render() {
    const tmpCor = this.props.color;
    return (<div id='text' style={{ color: tmpCor }}>
      {/* o código abaixo não é mais necessário */}
      {/* <span>{this.state.text}</span> */}
      <span><i className="fas fa-quote-left fa-lg fa-fw"></i> {this.props.quote} <i className="fas fa-quote-right fa-lg fa-fw"></i></span>
    </div>);
  }
}
```
> No início do projeto usei o state local em cada componente  
> Porém, com a evolução do projeto fui o desativando  
> Por isso alguns códigos comentados ainda estarão presentes


No segundo componente mostramos o autor da citação  
Seguindo o mesmo padrão de trazer o autor direto do store do Redux  
```javascript
// componente que mostrará o autor da citação
class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // estado abaixo desnecessário
      // owner: 'Autor em construção'
    }
  }
  render() {
    const tmpCor = this.props.color;
    return (<div id='author' style={{ color: tmpCor }}>
      {/* o código abaixo não é mais necessário */}
      {/* <span>{this.state.owner}</span> */}
      <span><i className="fas fa-minus fa-sm fa-fw"></i> {this.props.author}</span>
    </div>);
  }
}
```

O terceiro componente é um botão de tweet para criar um novo tweet  
Este componente tem acesso tanto ao texto quanto ao autor da citação  
Este componente renderiza apenas o símbolo do Tweeter do FontAwesome  
Se clicado, cria um novo tweet com o texto e o autor da citação  
```javascript
// componente que mostrará o botão para fazer um tweet da citação
class TweetQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const tmpCor = this.props.color;
    return (
      <a style={{ backgroundColor: tmpCor }} title='Tweet this quote' className='tweet-button bck-color' id='tweet-quote' href={encodeURI("https://twitter.com/intent/tweet?text=" + this.props.quote + " - " + this.props.author)} target='_blank' rel="noreferrer"><i className="fa-brands fa-twitter fa-sm fa-fw fa-inverse"></i></a>
    );
  }
}
```

O último componente é um botão que ao ser clicado escolhe uma das citações  
Depois define no store o novo texto e autor a ser mostrado  
```javascript
// componente que mostrará o botão para escolher a nova citação
class NewQuoteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // estado abaixo desnecessário
      // valorRandom: Math.floor(this.props.quotes.length * Math.random()),
    }
    this.submitNewQuote = this.submitNewQuote.bind(this);
  }
  submitNewQuote() {
    document.getElementById('text').style.opacity = 0;
    document.getElementById('author').style.opacity = 0;
    setTimeout(() => {// pegando o tamanho da lista de citações
      let numQuotes = this.props.quotes.length;
      let numColors = this.props.colors.length;
      // pegando um número aleatório como índice da lista de citações
      let escolha = Math.floor(numQuotes * Math.random());
      let escolhaCor = Math.floor(numColors * Math.random());
      // selecionando a citação escolhida da lista com o índice gerado
      const atualQuote = this.props.quotes[escolha];
      const atualColor = this.props.colors[escolhaCor]
      // redefinir o texto e o autor da citação na página
      this.props.setQuote(atualQuote);
      let appTmp = document.getElementsByClassName('bck-color');
      // appTmp.style.backgroundColor = atualColor;
      for (const item of appTmp) {
        item.style.backgroundColor = atualColor;
      }
      document.getElementById('text').style.color = atualColor;
      document.getElementById('author').style.color = atualColor;
      document.getElementById('text').style.opacity = 1;
      document.getElementById('author').style.opacity = 1;
    }, 1000);
  }
  render() {
    const tmpCor = this.props.color;
    return (
      <button style={{ backgroundColor: tmpCor }} className='quote-button bck-color' id='new-quote' onClick={this.submitNewQuote}>New Quote</button>
    );
  }
}
```

Este componente possui um método que é executado quando clicamos no botão  
```javascript
submitNewQuote()
```
Neste método, além de selecionar a nova citação, também mudamos a cor  
Uma cor é escolhida e definida como sendo a nova cor a ser mostrada  
```javascript
let numColors = this.props.colors.length;
let escolhaCor = Math.floor(numColors * Math.random());
const atualColor = this.props.colors[escolhaCor]
```
No último componente mostramos uma funcionalidade muito útil do **store Redux**  
Um dos componentes provocou uma ação que afetou quase todos os outros componentes  
A mudança do texto, do autor e da cor pelo botão afetou os outros componentes  
Mesmo sem a necessidade de que cada componente tivesse que consultar o store  

## Conexão do React com o Redux

Após a criação desses componentes fazemos de fato a conexão do Redux com o React  
Com o connect do react-redux conectamos os mapeamentos aos componentes  
```javascript
// conexão dos mapeamentos Redux com os componentes React
const QuoteCon = connect(mapQuoteStateToProps, mapQuoteDispatchToProps)(Quote);
const AuthorCon = connect(mapAuthorStateToProps, mapAuthorDispatchToProps)(Author);
const TweetCon = connect(mapTweetStateToProps,)(TweetQuote);
const NewQuoteCon = connect(mapQuotesStateToProps, mapQuotesDispatchToProps)(NewQuoteButton);
```
Com a conexão, criamos os componentes que serão renderizados na página  

Para finalizar, um novo componente é criado para prover a todos o store como props  
```javascript
// componente que vai renderizar os componentes conectados passando o store
class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: {}
    }
    this.listaQuotes = null;
  }
  render() {
    return (
      <Provider store={storeUnique}>
        <QuoteCon />
        <AuthorCon />
        <div className='buttons'>
          <TweetCon />
          <NewQuoteCon />
        </div>
      </Provider>
    );
  }
}
```
Assim, um componente é necessário para servir como o **Provider** do *react-redux*  
Este componente, usará o **Provider** para envolver e renderizar os componentes conectados  
Ao usar o **Provider** também passamos o *store* como propriedade para os componentes  

Após todas essas configurações, na função App, usamos a cor do store como cor de fundo  
```javascript
const rootParent = document.getElementById('root').parentElement;
rootParent.style.backgroundColor = storeUnique.getState().updateQuotes.color;
```
Dentro do return() incluímos nosso componente Provider e o footer da página  
```javascript
  return(
    <div className="App">
      <div id='quote-box'>
        <QuoteBox />
      </div>
      <div className='App-footer'>
        <p>by Alex Marques</p>
      </div>
    </div>
  );
```

# Deploy do Projeto no GitHub

Primeiro precisamos fazer o login no GitHub e criar um repositório  
Depois vamos fazer o push do projeto pro repositório  
Para isso já temos que ter o git instalado na máquina  
> PS: para cada sistema haverá um processo de instalação  
>
Com o *git* instalado, já podemos inicializar o repositório local
```bash
git init
```
Logo depois, precisamos adicionar todos os arquivos ao *stage*  
Com os arquivos no stage, podemos fazer o *commit* deles  
O *commit* prepara os arquivos para o envio ao repositório web  
```bash
git add .
git commit -m "mensagem para referência do envio"
```
Dependendo do seu sistema, ao inicializar o repositório  
sua branch local pode ficar diferente da branch da web  
Normalmente as branch's mais usadas sao *master* ou *main*  
Preferencialmente uso *main*, mas o *init* cria *master*  
Para alterar sua branch use o comando abaixo  
```bash
git branch -m master main
```
O comando faz a branch *master* mudar para o *main*  
Se seu repositório no GitHub já foi criado  
Terá um comando lá para conectar o local com o da web
O comando é único para cada usuário e repositório criado  
Um exemplo abaixo demonstra como deve ser o comando  
```bash
git remote add origin https://github.com/usuario/noma-repositorio.git
```
O comando acima irá conectar seu repositório local com o da web  
Mas podemos ter diversas conexões ao mesmo repositório  
Basta direcionar cada um a origens diferentes sendo cada um para um fim  
Por fim, basta fazer o envio dos arquivos pro repositório na web  
Normalmente chamamos esse processo de fazer o **push** dos arquivos  
```bash
git push -u origin main
```
O *push* vai enviar todos os arquivos que foram incluídos no *commit*  
O -u vai adicionar o conjunto *origin/main* ao rastreio de envios futuros  
Agora, instalamos no projeto o GitHub Pages com o comando abaixo:  
```bash
npm install gh-pages
```
Terminado, precisamos incluir uma *chave: valor* na configuração  
Colocaremos essa informação no *package.json*  
Como primeira *chave: valor* no arquivo colocaremos  
```bash
"homepage": "https://username.github.io/repositorio",
```
Mais à frente teremos a chave *"scripts"* que é um objeto  
Também com valores do tipo *"chave: valor"*  
Vamos incluir mais dois pares como scripts  
```bash
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
```
Essa informação pode ser encontrada na página do GitHub Pages  
Orientando como tudo deve ser feito para efetuar o deploy do projeto  
Por fim, execute o comando abaixo para fazer o *deploy* do projeto  
```bash
npm run deploy
```
Com isso criamos o projeto pronto pro deploy e o enviamos pra web  
Com o deploy feito, basta copiar o endereço do projeto no navegador  
Voltar ao site do FreeCodeCamp e colar no local para efetuar o teste  

Com isso concluí meu projeto da Máquina de Citação. . . . .




