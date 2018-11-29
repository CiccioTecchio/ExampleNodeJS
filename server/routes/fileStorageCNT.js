let fileStorage = require('../model/FileStorage');
let router = require('express').Router();
//const upload = require('express-fileupload');

router.post('/upload', function(req, res){
    let file = req.files.filename;
    let filename = file.name;
    file.mv('./upload/'+filename, function(err){
        if(err) res.status(500).end("500: Internal server error");
        else {//inserisci nel db
            fileStorage.create({name: filename})
                .then(doc => res.send({message:"a "+doc}).status(200).end())
                .catch(err => res.send({message:"b "+err}).status(403).end());
            //.then(doc =>res.send({message: ""}).status(200).end();
            //.catch(err => res.send({message:""+err}).statusCode(403));
        }
    });
    /*Soluzione con le promise
        .then(doc => res.send({message: ""+doc}).status(200).end())
        .catch(err => res.send({message:""+err}).statusCode(403));*/
});
module.exports = router;