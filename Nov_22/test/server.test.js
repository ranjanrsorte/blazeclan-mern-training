import test from 'chai';
import request from 'request';
import instance from './../server.js';

let expect = test.expect;

describe('Testing REST API', () => {
    let credentials = { "username": "user@test.com", "password": "user-test" }

    it('Testing user authentication API', (done) => {

        request.post('http://localhost:7014/api/authuser', {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }, (error, response, body) => {
            console.log(response.body);
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});