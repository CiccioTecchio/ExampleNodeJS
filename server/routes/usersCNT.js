let express = require('express');
let router = express.Router();
let user = require('../model/User');

router.post('/login', function(req, res){
    user.findOne({where: {"username":req.body.username, "password":req.body.password} })
    .then( doc => {if(doc===null)res.sendStatus(404)
    .end({"message": "utente non trovato"});else res.status(200).send(doc)});
});


router.post('/signin', function (req,res,err) {
    user.create({"username": req.body.username,"password":req.body.password}).then(doc=>res.send({"message": "registrato"}).status(200).end())
    .catch(err=> res.sendStatus(409).end({"message": "già presente"}));
});

module.exports = router;