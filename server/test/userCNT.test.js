process.env.NODE_ENV = 'test';

let expect  = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let randomstring = require("randomstring");
let server = require('../app');

chai.use(require('chai-match'));
let  should = chai.should();
chai.use(chaiHttp);

let regexp = {
username :/\w*/,
password :/((\w+|\d+)+){4,32}/,
mail : /\w*\d*@studenti\.unisa\.it/
}

describe('Signin',function(){
it('/POST: it should add a user if  exist',function(done){
    let random = randomstring.generate(4);
    let user ={username:random,password:"1234"};
    chai.request(server)
    .post('/users/signin')
    .send(user)
    .end(function(err,res){
        res.should.have.status(200);
        done();
    });
});


it('/POST: it should not add a user if it does exist',function(done){
    let user ={username:"Ciccio",password:"1234"};
    chai.request(server)
    .post('/users/signin')
    .send(user)
    .end(function(err,res){
        res.should.have.status(409);
        done();
    });
});
});
describe('Login',function(){
it('/POST: it should login a user if it exist',function(done){
    let user ={username:"Palombo",password:"1234"};
    chai.request(server)
    .post('/users/login')
    .send(user)
    .end(function(err,res){
        res.should.have.status(200);
        done();
    });
});

it('/POST: it should not login a user if it does not exist',function(done){
    let user ={username:"aiugciwaeviawe",password:"1234"};
    chai.request(server)
    .post('/users/login')
    .send(user)
    .end(function(err,res){
    res.should.have.status(404);
    done();
        });
});
});