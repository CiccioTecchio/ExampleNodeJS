process.env.NODE_ENV = 'test';

let expect  = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let randomstring = require("randomstring");
let server = require('../app');
// eslint-disable-next-line no-unused-vars
let  should = chai.should();
chai.use(require('chai-match'));
chai.use(chaiHttp);

it('POST: it should response with a object', function(done){
    let obj= {msg: randomstring.generate(3)};
    chai.request(server)
        .post('/observer/listen')
        .send(obj)
        .end(function(err, res){
            res.should.have.status(200);
            expect(res.body).to.be.an('object');
            done();
        });
});

it('POST: it should response with a object', function(done){
    let obj= {msg: "inc"};
    chai.request(server)
        .post('/observer/listen')
        .send(obj)
        .end(function(err, res){
            res.should.have.status(200);
            expect(res.body).to.be.an('object');
            done();
        });
});

it('GET: it should response with a string', function(done){
    
    chai.request(server)
        .get('/observer/response')
        .end(function(err, res){
            res.should.have.status(200);
            expect(res.body).to.be.an('object');
            done();
        });
});

it('GET ACCEDUTO: it expects to receive an object', function(done){
    chai.request(server)
        .get('/observer/acceduto')
        .end(function(err, res){
            res.should.have.status(200);
            expect(res.body).to.be.an('object');
            done();
        });
});

it('POST ACCEDE: it expects to receive an object', (done) => {
    let obj={username:"Ciccio", password:"1234"};
    chai.request(server)
        .post('/observer/accede')
        .send(obj)
        .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
        })
        .end(done());
});

it('ACCEDE: it expects to receive a status 404', (done) => {
    let obj={username:"Ciccio", password:"12345"};
    chai.request(server)
        .post('/observer/accede')
        .send(obj)
        .then((res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object');
        })
        .end(done());
});