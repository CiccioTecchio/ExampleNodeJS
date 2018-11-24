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

// todo test with regexp
let regexp = {
    username :/\w*/,
    password :/((\w+|\d+)+){4,32}/,
    mail : /\w*\d*@studenti\.unisa\.it/
}

describe('Signin', function(){
    it('/POST: it should add a user if  exist', function(done){
        let random = "Test"+randomstring.generate(4);
        let user ={username:random, password:"1234"};
        chai.request(server)
            .post('/users/signin')
            .send(user)
            .end(function(err, res){
                res.should.have.status(200);
                expect(res.body.username).to.match(regexp.username);
                expect(res.body.password).to.match(regexp.password);
                done();
            });
    });


    it('/POST: it should not add a user if it does exist', function(done){
        let user ={username:"Ciccio", password:"1234"};
        chai.request(server)
            .post('/users/signin')
            .send(user)
            .end(function(err, res){
                res.should.have.status(409);
                expect(res.body.username).to.match(regexp.username);
                expect(res.body.password).to.match(regexp.password);
                done();
            });
    });
});
describe('Login', function(){
    it('/POST: it should login a user if it exist', function(done){
        let user ={username:"Palombo", password:"1234"};
        chai.request(server)
            .post('/users/login')
            .send(user)
            .end(function(err, res){
                res.should.have.status(200);
                expect(res.body.username).to.match(regexp.username);
                expect(res.body.password).to.match(regexp.password);
                done();
            });
    });

    it('/POST: it should not login a user if it does not exist', function(done){
        let user ={username:"aiugciwaeviawe", password:"1234"};
        chai.request(server)
            .post('/users/login')
            .send(user)
            .end(function(err, res){
                res.should.have.status(404);
                expect(res.body.username).to.match(regexp.username);
                expect(res.body.password).to.match(regexp.password);
                done();
            });
    });
});

describe('Userlist', function(){
    it('/GET: it should show the user list', function(done){
        chai.request(server)
            .get('/users/userlist')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

});

describe('Delete', function(){
    it('/DELETE: it should delete the test user', function(done){
        chai.request(server)
            .delete('/users/deleteTest')
            .end(function(err, res){
                res.should.have.status(200);
                //expect(res.body.message).equals("eliminati");
                done();
            });
    });
});