import React from 'react';
import './App.scss';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import arrayQuotes from "./quotes-freecodecamp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import COLOR_ARRAY from './colorsArray';

// let initial_quotes = [
//   {
//     quote: 'A person who never made a mistake never tried anything new.',
//     author: 'Albert Einstein'
//   },
//   {
//     quote: 'First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end.',
//     author: 'Aristotle'
//   },
//   {
//     quote: 'Life is what we make it, always has been, always will be.',
//     author: 'Grandma Moses'
//   },
//   {
//     quote: "You may be disappointed if you fail, but you are doomed if you don’t try.",
//     author: 'Beverly Sills'
//   },
//   {
//     quote: 'Education costs money.  But then so does ignorance.',
//     author: 'Sir Claus Moser'
//   },
// ];

// const initial_quote = {
//   quote: 'Education costs money.  But then so does ignorance.',
//   author: 'Sir Claus Moser'
// };

// const sourceQuotesURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
// // const quotesList = (url) => {
// //   let objTMP = {};
// //   var promessaTMP = fetch(url).then((response) => response.json()).then((result) => {
// //     // console.log('o valor do result é:');
// //     // console.log(result['quotes']);
// //     // initial_quotes = result['quotes'];
// //     objTMP = Object.assign({}, result);
// //     objTMP['quotes'] = [...result['quotes']];
// //     // console.log(objTMP.quotes[0].quote + "\n" + objTMP.quotes[0].author);
// //     // return objTMP;
// //   });
// //   // console.log(objTMP);
// //   return objTMP;
// // };

// escolhendo qual será a citação inicial
const initial_quote2 = arrayQuotes.quotes[Math.floor(arrayQuotes.quotes.length * Math.random())];

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

// store com reducers combinados
const storeUnique = createStore(combineReducers({
  readQuote: quoteQuoteReducer,
  readAuthor: authorQuoteReducer,
  tweetQuote: tweetQuoteReducer,
  updateQuotes: updateQuoteReducer,
}));

// mapeando partes do store para ser acessado pelo componente
const mapQuoteStateToProps = (store) => { return { quote: store.readQuote.quote, color: store.updateQuotes.color } };
const mapAuthorStateToProps = (store) => { return { author: store.readAuthor.author, color: store.updateQuotes.color } };
const mapTweetStateToProps = (store) => { return { quote: store.readQuote.quote, author: store.readAuthor.author, color: store.updateQuotes.color } };
const mapQuotesStateToProps = (store) => { return { quotes: store.updateQuotes.quotes, colors: store.updateQuotes.colors, color: store.updateQuotes.color } };

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

// conexão dos mapeamentos Redux com os componentes React
const QuoteCon = connect(mapQuoteStateToProps, mapQuoteDispatchToProps)(Quote);
const AuthorCon = connect(mapAuthorStateToProps, mapAuthorDispatchToProps)(Author);
const TweetCon = connect(mapTweetStateToProps,)(TweetQuote);
const NewQuoteCon = connect(mapQuotesStateToProps, mapQuotesDispatchToProps)(NewQuoteButton);

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

// função padrão que é renderizada na página e envolve todo o resto
function App() {
  const rootParent = document.getElementById('root').parentElement;
  rootParent.style.backgroundColor = storeUnique.getState().updateQuotes.color;
  return (
    /* o comentário a seguir faz uso do state local do componente
      fiz preferência em usar um store único compartilhado por eles
    const [quotes, setQuotesList] = useState(null);

    const loadQuotes = async (url)=>{
      const quotesFromJSON = await fetch(url).then((response)=>{response.json()});
      setQuotesList(quotesFromJSON);
      console.log(quotesFromJSON);
    };

    useEffect(()=>{
      loadQuotes(sourceQuotesURL);
    }, [sourceQuotesURL]);
    */
    <div className="App">
      <div id='quote-box'>
        <QuoteBox />
      </div>
      <div className='App-footer'>
        <p>by Alex Marques</p>
      </div>
    </div>
  );
}

export default App;
