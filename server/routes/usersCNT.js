let express = require('express');
let router = express.Router();
let user = require('../model/User');

router.post('/login', function(req, res){
    login(req.body.username,req.body.password,res);
});


router.post('/signin', function (req,res,err) {
    signin(req.body.username,req.body.password,res);
});


function login(username,pswd,res){
    user.findOne({where: {"username":username, "password":pswd} })
        .then( doc => {if(doc===null)res.sendStatus(404)
        .end({"message": "utente non trovato"});else res.status(200).send(doc)});
}

function signin(username,pswd,res){
    user.create({"username": username,"password":pswd}).then(doc=>res.send({"message": "registrato"}).status(200).end())
                                                       .catch(err=> res.sendStatus(409).end({"message": "già presente"}));
}

module.exports.router = router;
module.exports.login = login;
module.exports.signin = signin;