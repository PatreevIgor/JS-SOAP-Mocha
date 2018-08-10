var soap = require("soap");
var parser = require('xml2json');
var should = require('should');
var util = require('util');

var url = "http://www.thomas-bayer.com/axis2/services/BLZService?wsdl";
var args = {blz: "47260234"};

describe("a test of method BLZService", function(){
  var soapResult = null;

  before(function(done){
    this.timeout(5000);
    soap.createClient(url, function(err, client) {
      client.getBank(args, function(err, result) {
        soapResult = result;
        done();
      });
    });
  });

  it('should expected result equal soap result', function(){
    var expectedResult = { details:
                           { bezeichnung: 'Volksbank Elsen-Wewer-Borchen',
                             bic:         'GENODEM1EWB',
                             ort:         'Paderborn',
                             plz:         '33075' } }

    parser.toXml(soapResult).should.equal(parser.toXml(expectedResult));
  });

  it('should returns correctly bic', function(){
    soapResult.details.bic.should.equal("GENODEM1EWB");
  });

});

