let express = require('express');
let router = express.Router();
const EventEmitter = require('events');

class MyEmitter extends EventEmitter{}

let myEmitter = new MyEmitter();
let obj;

router.post('/listen', function(req, res){
    let i=0;
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
    res.send({msg:obj.msg});
});

module.exports = router;