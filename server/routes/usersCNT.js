let express = require('express');
let router = express.Router();
let user = require('../model/User');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.post('/login', function(req, res){
  let username = req.body.username;
  let pswd = req.body.password;
  user.findOne({where: {"username":username, "password":pswd} })
      .then( doc => {if(doc===null)res.sendStatus(404)
      .end({"message": "utente non trovato"});else res.status(200).send(doc)});
});

router.post('/signin', function (req,res,err) {
    let username = req.body.username;
    let pswd = req.body.password;
    user.create({"username": username,"password":pswd}).then(doc=>res.send({"message": "registrato"}).status(200).end())
                                                       .catch(err=> res.sendStatus(409).end({"message": "già presente"}));
});

module.exports = router;
