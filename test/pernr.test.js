var Pernr = require('../lib/pernr');
var expect = require('chai').expect;

describe('Pernr', function(){
  describe('Parsing', function(){
    describe('Error handling', function(){
      it('invalid format', function(){
        expect(function(){new Pernr('011x3544e095');}).to.throw(TypeError);
      });
      it('invalid date', function(){
        expect(function(){new Pernr('011354-4095');}).to.throw(TypeError);
      });
    });
    describe('Birth date', function(){
      it('should parse birth dates in the 21 century', function(){
        var pernr = new Pernr('010101-4095');
        var birthDate = pernr.getBirthDate();
        expect(birthDate.getFullYear()).to.equal(2001);
        expect(birthDate.getMonth()).to.equal(0);
        expect(birthDate.getDate()).to.equal(1);
      });
      it('should parse birth dates in the 20 century', function(){
        var pernr = new Pernr('990101-4498');
        var birthDate = pernr.getBirthDate();
        expect(birthDate.getFullYear()).to.equal(1999);
      });
      it('should parse the (+) delimiter correctly', function(){
        var pernr = new Pernr('010101+4095');
        var birthDate = pernr.getBirthDate();
        expect(birthDate.getFullYear()).to.equal(1901);
      });
      it('should parse birth dates including century', function(){
        var pernr = new Pernr('20010101-4095');
        var birthDate = pernr.getBirthDate();
        expect(birthDate.getFullYear()).to.equal(2001);
      });
      it('should parse birth pernrs missing delimiter(-)', function(){
        var pernr = new Pernr('0101014095');
        var birthDate = pernr.getBirthDate();
        expect(birthDate.getFullYear()).to.equal(2001);
      });
      it('should parse birth pernrs including century but missing delimiter (-)', function(){
        var pernr = new Pernr('200101014095');
        var birthDate = pernr.getBirthDate();
        expect(birthDate.getFullYear()).to.equal(2001);
      });
    });
    describe('Region', function(){
      it('should parse regions correctly', function(){
        expect((new Pernr('800101-0000')).getRegion()).to.equal('Stockholms län');
        expect((new Pernr('800101-1400')).getRegion()).to.equal('Uppsala län');
        expect((new Pernr('800101-1600')).getRegion()).to.equal('Södermanlands län');
        expect((new Pernr('800101-1900')).getRegion()).to.equal('Östergötlands län');
        expect((new Pernr('800101-2400')).getRegion()).to.equal('Jönköpings län');
        expect((new Pernr('800101-2700')).getRegion()).to.equal('Kronobergs län');
        expect((new Pernr('800101-2900')).getRegion()).to.equal('Kalmar län');
        expect((new Pernr('800101-3200')).getRegion()).to.equal('Gotlands län');
        expect((new Pernr('800101-3300')).getRegion()).to.equal('Bleking län');
        expect((new Pernr('800101-3500')).getRegion()).to.equal('Kristianstad län');
        expect((new Pernr('800101-3900')).getRegion()).to.equal('Malmöhus län');
        expect((new Pernr('800101-4600')).getRegion()).to.equal('Hallands län');
        expect((new Pernr('800101-4800')).getRegion()).to.equal('Göteborgs och Bohus län');
        expect((new Pernr('800101-5500')).getRegion()).to.equal('Älvsborgs län');
        expect((new Pernr('800101-5900')).getRegion()).to.equal('Skaraborgs län');
        expect((new Pernr('800101-6200')).getRegion()).to.equal('Värmlands län');
        expect((new Pernr('800101-6600')).getRegion()).to.equal('Örebro län');
        expect((new Pernr('800101-6900')).getRegion()).to.equal('Västmanlands län');
        expect((new Pernr('800101-7100')).getRegion()).to.equal('Kopparbergs län');
        expect((new Pernr('800101-7500')).getRegion()).to.equal('Gävleborgs län');
        expect((new Pernr('800101-7800')).getRegion()).to.equal('Västernorrland län');
        expect((new Pernr('800101-8200')).getRegion()).to.equal('Jämtlands län');
        expect((new Pernr('800101-8500')).getRegion()).to.equal('Västerbottens län');
        expect((new Pernr('800101-8900')).getRegion()).to.equal('Norrbottens län');
      });
      it('should not return a region for pernrs after 1989', function(){
        var pernr = new Pernr('900101-4597');
        var region = pernr.getRegion();
        expect(region).to.be.null;
      });
    });
    describe('Gender', function(){
      it('should parse male pernrs correctly', function(){
        expect((new Pernr('800101-8930')).getGender()).to.equal(Pernr.MALE);
      });
      it('should parse female pernrs correctly', function(){
        expect((new Pernr('800101-8920')).getGender()).to.equal(Pernr.FEMALE);
      });
    });
  });
  describe('Validation', function(){
    it('should classify invalid pernrs as invalid', function(){
      expect((new Pernr('010101-0101')).isValid()).to.equal(false);
      expect((new Pernr('991231-0102')).isValid()).to.equal(false);
      expect((new Pernr('111111-1111')).isValid()).to.equal(false);
    });
    it('should classify valid pernrs as valid', function(){
      expect((new Pernr('010101-4389')).isValid()).to.equal(true);
      expect((new Pernr('010101-4405')).isValid()).to.equal(true);
      expect((new Pernr('010101-4421')).isValid()).to.equal(true);
    });
  });
  describe('Stringification', function(){
    it('should stringify pernr to compact format per default', function(){
      expect((new Pernr('010101-0101')).toString()).to.equal('010101-0101');
    });
    it('should stringify pernrs older than 100 years with (+) as delimiter', function(){
      expect((new Pernr('19100101-0101')).toString()).to.equal('100101+0101');
    });
    it('should stringify pernr to extended format when requested', function(){
      expect((new Pernr('010101-0101'))
             .toString({fullYear: true})).to.equal('20010101-0101');
    });
  });
});
