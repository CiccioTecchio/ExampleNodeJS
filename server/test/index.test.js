process.env.NODE_ENV = 'test';

let expect  = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let randomstring = require("randomstring");
let server = require('../app');

chai.use(require('chai-match'));
let  should = chai.should();
chai.use(chaiHttp);

it('GET: it should render the home page', function(done){
    chai.request(server)
        .get('/')
        .end(function(err, res){
            res.should.have.status(200);
            done();
        });
});