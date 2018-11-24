# ExampleNodeJS  
[![Build Status](https://travis-ci.com/CiccioTecchio/ExampleNodeJS.svg?branch=master)](https://travis-ci.com/CiccioTecchio/ExampleNodeJS) [![Coverage Status](https://coveralls.io/repos/github/CiccioTecchio/ExampleNodeJS/badge.svg?branch=master)](https://coveralls.io/github/CiccioTecchio/ExampleNodeJS?branch=master)

In questo esempio vi mostrerò una semplice applicazione web fatta in NodeJS.

## Come iniziare
1. Installare [NodeJS & NPM](https://nodejs.org/it/), scegliete la versione consigliata.
2. Per "giocare" con questo progetto e fare le vostre prove dovete clonare questo repository. Potete clonarlo con GitKraken o con la bash di git digitando  
`git clone https://github.com/CiccioTecchio/ExampleNodeJS.git`.
3. Una volta clonato recarsi sulla root del progetto(la cartella ExampleNodeJS) con la bash di node e digitate il comando `npm i` per scaricare le dipendenze con npm.
4. Per quanto riguarda la IDE da utilizzare io ho usato [Visual Studio Code](https://code.visualstudio.com/download) ma potete usare anche [WebStorm](https://www.jetbrains.com/webstorm/)(per gli studenti è gratis) oppure potete anche semplicemente aprire i file con un blocco note.

## Che cosa fa questa applicazione
Questa applicazione ha lo scopo di farvi capire come avvengono le chiamate fra client e server e come quest'ultimo comunichi con il db.  
L'app è molto semplice è una pagina web che presenta due campi di testo **username**, **password** e due bottoni **signin** **login**.
- compilando i campi e cliccando il tasto **login** parte una chiamata AJAX(fatta in jquery) che chiama il servizio esposto da node all'indirizzo _/users/login_ per effettuare la login. 
Questo servizio prende i dati inviati dall'utente e li cerca nel db se li trova restituisce **status 200** altrimenti **status 404**.
- compilando i campi cliccando il tasto **signin** parte una chiamata AJAX(fatta in jquery) che chiama il servizio esposto da node all'indirizzo _/users/signin_ per effettuare la registrazione di un utente. Questo servizio prende i dati inviati dall'utente e se non è già presente lo inserisce e restituisce **status 200** altrimenti **status 409**

## Struttura del codice
### app.js
è il nostro "main" qui vengo fatti i **require**(sarebbe l'equivalente dell'import di Java) delle dipendenze che abbiamo scaricato.  
```javascript
let usersRouter = require('./routes/usersCNT');
```
Il codice soprastante definisce la variabile che utilizzeremo per il routing dei servizi di user.  
Di seguito andiamo ad indicare dove si troveranno i file .html che dovrà caricare il server, questi file sono contenuti nella cartella **public**.
```javascript
app.use(express.static(path.join(__dirname, 'public')));
```
Qui andiamo ad usere i router che abbiamo definito precedentemente  
```javascript 
app.use('/users', usersRouter);
```
questo vuol dire che sotto l'indirizzo "/users" ci saranno tutti i servizi relativi agli users.
### singleton.js
il file _singleton/singleton.js_ rappresenta una istanza della connessione al db.
### User.js
in _model/User.js_ abbiamo il model che rappresenta l'entita del nostro db.
### UserCNT.js
questo è il nostro "controller" qui effettueremo le operazioni di **signin** e **login**.
- **login**  
```javascript
router.post('/login', function(req, res){
  let username = req.body.username;
  let pswd = req.body.password;
  user.findOne({where: {"username":username, "password":pswd} })
      .then( doc => {if(doc===null)res.sendStatus(404)
      .end({"message": "utente non trovato"});else res.status(200).send(doc)});
});
```
Esponiamo un servizio accessibile tramite una chiamata POST sull' indirizzo http://localhost:3000/users/login
la funzione ha due parametri _req_ è ciò che ci viene inviato dal client tramite la AJAX e _res_ che è il risultato che noi manderemo al client.  Facciamo la query con il metodo _user.findOne_ e diciamo che spediremo il json chiamato _doc_ se il suo contenuto non è null altrimenti spediremo un json che contiene un messaggio di errore e modificheremo lo stato http a 404
- **signin** funziona come login  

## Il client
l'interfaccia web che interagisce con il server si trova nella cartella `/public` qui troveremo `index.html` che è l'unica pagina web del nostra applicazione. Quindi se si vuole creare una app web con un template fatto in html basta aggiungere il template sotto la cartella `/public`.

## Testing
Per quanto riguarda il testing framework [Mocha](https://mochajs.org/) insieme al TDD [Chai](https://www.chaijs.com/) permette utilizzare il meccanismo delle asserzioni in Node.js e infine [Istanbul](https://istanbul.js.org/) che permette di visualizzare varie metriche come line coverage, branch coverage, function coverage e statement coverage.  
La classe per il test delle richieste di **UserCNT** è **UserCNT.test.js** e si trova nella cartella _server/test_.  
Il file di configurazione per la test coverage è `.nycrc`.  
Nella cartella _test_ è contenuto anche il file `travis.sql`, questo file è il db di test da eseguire su Travis.
Con la keyword `describe` andiamo a raggruppare più casi di test, con la keyword `it` andiamo a descrivere il caso di test.  
Lanciando il comando `npm test` possiamo vedere i casi di test se sono andiati a buon fine e quanto il nostro codice è coperto dal test.
#### test andato a buon fine
<div style="text-aling:center">
 <img src="https://github.com/CiccioTecchio/ExampleNodeJS/blob/master/img/test.png"/>
 </div>

#### test coverage
<div style="text-aling:center">
 <img src="https://github.com/CiccioTecchio/ExampleNodeJS/blob/master/img/coverage.png"/>
 </div>

## Continuous integration
Questa app è stata integrata con [Travis.ci](https://travis-ci.com/) e [Coveralls](https://coveralls.io/) per vedere la configurazione consultare il file `travis.yml`.

## Code quality
L'app è stata integrata con [ESLint](https://eslint.org/) che si occupare di revisionare e aggiustare la forma del codice. Il file di configurazione è `.eslint` qui viene definito lo standard da seguire per la scrittura del codice. Dalla cartella `server` digitando il comando ` ./node_modules/.bin/eslint app.js routes/** test/**.js` viene mostrato il numero di errori(ovvero le linee che non rispettano lo standard) di _app.js_, tutti i file sotto _routes_ e tutti i file .js sotto _test_. Per risolvere alcuni di questi problemi basta lanciare il comando `./node_modules/.bin/eslint --fix app.js routes/** test/**.js`

## Come lanciare l'applicazione 
1. Avviare XAMPP(o una sua alternativa) e importare lo schema `Example_users.sql`
2. Dalla bash di node andate sulla root del progetto e digitare
``bash
cd server
node app.js``
3. Da questo momento il server è avviato e all'indirizzo http://localhost:3000/ potete trovare la home del sito.

## Letture e video consigliati
- [Architetture REST](https://www.restapitutorial.com/)
- [Node.js Tutorial](https://youtu.be/U8XF6AFGqlc)
- [Express](https://expressjs.com/)
- [Sequelize](http://docs.sequelizejs.com/)
- [Codici HTTP](https://restfulapi.net/http-status-codes/)
- [Testing with Mocha e Chai](https://mherman.org/blog/testing-node-js-with-mocha-and-chai/)
