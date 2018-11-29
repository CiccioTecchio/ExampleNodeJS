process.env.NODE_ENV = 'test';

//let expect  = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
// eslint-disable-next-line no-unused-vars
let  should = chai.should();
chai.use(require('chai-match'));
chai.use(chaiHttp);

it('POST: dovrebbe uppare il file', function(done){
    let toSend = {}; 
    chai.request(server)
        .post('/file/upload')
        .attach(toSend)
        .send(toSend)
        .end(function(err, res){
            res.should.have.status(200);
            done();
        });    
});
