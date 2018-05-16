var assert = require('assert');
var http = require ('http');
var votingApp = require('./app.js')


describe('request.agent(votingApp)', function(done) {
    var server;

    before(function() {
        server = votingApp.listen(3000);
    });

    after(function() {
        server.close();
    });

    it('status response should be equal 200', function(done) {
        http.get('http://127.0.0.1:3000', function(response) {
            assert.equal(response.statusCode, 200);
            done();
        });
    });
});
