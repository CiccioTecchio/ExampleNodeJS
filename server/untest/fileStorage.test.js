process.env.NODE_ENV = 'test';

//let expect  = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
// eslint-disable-next-line no-unused-vars
let  should = chai.should();
chai.use(require('chai-match'));
chai.use(chaiHttp);

it('dovrebbe NON uppare il file', function(done){
    //const filePath = `${__dirname}/upload/upload.txt`;
    chai.request(server)
        .post('/file/upload')
        .field('customKey', 'customValue')
        .attach('files', '/Users/francescovicidomini/git/ExampleNodeJS/server/upload/upload.txt', 'upload.txt')
        .end(function(err, res){
            res.should.have.status(500);
            done();
        });    
});

it('dovrebbe UPPARE il file', function(done){
    let filename= "2018-11-28 15.11.55.jpg";
    chai.request(server)
        .post('/file/upload')
        .attach('image', '/Users/francescovicidomini/git/ExampleNodeJS/server/upload/'+filename)
        //.field('customKey', 'customValue')
        //.attach('files', '/Users/francescovicidomini/git/ExampleNodeJS/server/upload/upload.txt', 'upload.txt')
        .end(function(err, res){
            res.should.have.status(200);
            done();
        });    
});