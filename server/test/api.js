process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');

let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);


describe('#api()', function() {
    context('without arguments', function() {
        it('should return 400 Bad Request if no parameter', function(done) {
            chai.request('http://localhost:8081').get('/')
                .end(res => {
                    expect(res.body).to.not.exist;
                    res.should.have.status(400);
                    done();
                });
        });

        it('should return 400 Bad Request if invalid IP', function(done) {
            chai.request('http://localhost:8081').get('/').query({ip: '170.2.3.4/24'})
                .end(res => {
                    expect(res.body).to.not.exist;
                    res.should.have.status(400);
                    done();
                });
        });
    });
    
    context('with valid IP', function() {
        it('should return 200 and response if valid IP', function(done) {
            chai.request('http://localhost:8081').get('/').query({ip: '204.2.3.4'})
                .then(res => {
                    expect(res.body.city).to.exist;
                    res.should.have.status(200);
                    done();
                });
        });
    })

    // context('with valid IP Address', function() {
    //     it('should return 200 request with result in body', function() {
    //         expect(sum()).to.equal(0)
    //     })
    // })
});