let express = require('express');
let router = express.Router();
let user = require('../model/User');
let singleton = require('../signleton/singleton');
const Op = singleton.Op;

router.post('/login', function(req, res){
    user.findOne({where: {"username":req.body.username, "password":req.body.password} })
        .then( doc => {if(doc===null)res.sendStatus(404).end({"message": "utente non trovato"});
        else res.status(200).send(doc);});
});

router.post('/signin', function (req, res) {
    user.create({"username": req.body.username, "password":req.body.password})
        .then(doc => res.send(doc).status(200).end())
        .catch(err => res.sendStatus(409).end(err));
});

router.get('/userlist', function(req, res){
    user.findAll({attributes: ['username']})//attributes sarebbe la SELECT
        .then(doc => res.send(doc).status(200).end());
});

router.delete('/deleteTest', function(req, res){
    user.destroy({where: {username: {[Op.like]: 'Test%'}}})
        .then(doc => res.send(doc.body).status(200).end());
});

module.exports = router;