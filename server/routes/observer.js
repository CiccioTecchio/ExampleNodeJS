let express = require('express');
let router = express.Router();
const EventEmitter = require('events');
let user = require('../model/User');

class MyEmitter extends EventEmitter{}

let myEmitter = new MyEmitter();
let obj;
let i=0;
router.post('/listen', function(req, res){
    obj = req.body;
    myEmitter.once('sendmsg', () => {//.on resta sempre in ascolto
        if(obj.msg==="inc"){
            i++;
        }
        else{
            i--;
        }
    });
    myEmitter.emit('sendmsg');
    res.send({msg: i});
});

router.get('/response', function(req, res){
    myEmitter.emit('sendmsg');
    res.send({msg:i});
});

router.post('/accede', function(req, res){
    myEmitter.once('auth', () => {
        user.findOne({where: {"username":req.body.username, "password":req.body.password} })
            .then(doc => {
                myEmitter.emit('auth');
                obj=doc.username;
                res.send(doc.username).end();
            })
            .catch(err => res.sendStatus(404).end(err));
    });
});

router.get('/acceduto', function(req, res){
    myEmitter.emit('auth');
    res.send({username:obj});
});

module.exports = router;