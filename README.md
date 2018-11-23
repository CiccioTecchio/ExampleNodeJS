# ExampleNodeJS  
[![Build Status](https://travis-ci.com/CiccioTecchio/ExampleNodeJS.svg?branch=master)](https://travis-ci.com/CiccioTecchio/ExampleNodeJS) [![Coverage Status](https://coveralls.io/repos/github/CiccioTecchio/ExampleNodeJS/badge.svg?branch=master)](https://coveralls.io/github/CiccioTecchio/ExampleNodeJS?branch=master)

In questo esempio vi mostrerò una semplice applicazione web fatta in NodeJS.

## Come iniziare
1. Installare [NodeJS & NPM](https://nodejs.org/it/), scegliete la versione consigliata.
2. Per "giocare" con questo progetto e fare le vostre prove dovete clonare questo repository. Potete clonarlo con GitKraken o con la bash di git digitando  
```git clone https://github.com/CiccioTecchio/ExampleNodeJS.git```.
3. Una volta clonato recarsi sulla root del progetto(la cartella ExampleNodeJS) con la bash di node e digitate il comando ```npm i``` per scaricare le dipendenze con npm.
4. Per quanto riguarda la IDE da utilizzare io ho usato [Visual Studio Code](https://code.visualstudio.com/download) ma potete usare anche [WebStorm](https://www.jetbrains.com/webstorm/)(per gli studenti è gratis) oppure potete anche semplicemente aprire i file con un blocco note.

## Che cosa fa questa applicazione
Questa applicazione ha lo scopo di farvi capire come avvengono le chiamate fra client e server e come quest'ultimo comunichi con il db.  
L'app è molto semplice è una pagina web che presenta due campi di testo **username**, **password** e due bottoni **signin** **login**.
- compilando i campi e cliccando il tasto **login** parte una chiamata AJAX(fatta in jquery) che chiama il servizio esposto da node all'indirizzo _/users/login_ per effettuare la login. 
Questo servizio prende i dati inviati dall'utente e li cerca nel db se li trova restituisce **status 200** altrimenti **status 404**.
- compilando i campi cliccando il tasto **signin** parte una chiamata AJAX(fatta in jquery) che chiama il servizio esposto da node all'indirizzo _/users/signin_ per effettuare la registrazione di un utente. Questo servizio prende i dati inviati dall'utente e se non è già presente lo inserisce e restituisce **status 200** altrimenti **status 409**

## Struttura del codice
#### app.js
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
#### singleton.js
il file _singleton/singleton.js_ rappresenta una istanza della connessione al db.
#### User.js
in _model/User.js_ abbiamo il model che rappresenta l'entita del nostro db.
#### UserCNT.js
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
- **il client** sarebbe _/public/index.html_ in questo file ci saranno le chiamate AJAX che facciamo al server

## Come lanciare l'applicazione 
1. Avviare XAMPP e importare il db(è il file Example_users.sql)
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
