var expect  = require('chai').expect;
var request = require('superagent');
var chai = require('chai');
chai.use(require('chai-match'));
let regUsername=/\w*/
let regPassword=/((\w+|\d+)+){4,32}/;
let regMail= /\w*\d*@studenti\.unisa\.it/;

describe('Singup', function(){
it('/POST: it should add a user if it does not exist',function(done){
    let user ={username:"Pasquale",password:"1234"};
    request.post('http://localhost:3000/users/signin')
    .set('Content-Type', 'application/json')
    .send(user)
    .end(function(err,res){
        expect(res.statusCode).to.equal(200);
        expect(res.body.username).to.match(regUsername);
        expect(res.body.password).to.match(regPassword);
        done();
    })
});

it('/POST: it should not add a user if it already exists',function(done){
    let user ={username:"Pasquale",password:"1234"};
    request.post('http://localhost:3000/users/signin')
    .set('Content-Type', 'application/json')
    .send(user)
    .end(function(err,res){
        expect(res.statusCode).to.equal(409);
        expect(res.body.username).to.match(regUsername);
        expect(res.body.password).to.match(regPassword);
        //
        done();
    })
});
});



describe('Login', function(){
it('/POST: it should do the login if the user exist',function(done){
    let user ={username:"Pasquale",password:"1234"};
    request.post('http://localhost:3000/users/login')
    .set('Content-Type', 'application/json')
    .send(user)
    .end(function(err,res){
        //console.log(res.body.username);
        expect(res.statusCode).to.equal(200);
        expect(res.body.username).to.match(regUsername);
        expect(res.body.password).to.match(regPassword);
        done();
    })
});

it('/POST: it should not login if the user does not exist',function(done){
    let user ={username:"Poldo",password:"1234"};
    request.post('http://localhost:3000/users/login')
    .set('Content-Type', 'application/json')
    .send(user)
    .end(function(err,res){
        //console.log(res.body.username);
        expect(res.statusCode).to.equal(404);
        expect(res.body.username).to.match(regUsername);
        expect(res.body.password).to.match(regPassword);
        done();
    })
});

});