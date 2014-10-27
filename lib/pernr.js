"use strict";

var MALE = 'male';
var FEMALE = 'female';
var PARSE_REGEX = /(\d{2})?(\d{6})([-\+])?(\d{4})/;

function getChecksum(digits){
  return (100 - digits.map(function(digit, i){
    var fac = 2 - i % 2;
    return digit * fac;
  }).map(function(digit){
    return digit >= 10 ? digit - 9 : digit;
  }).reduce(function(memo, digit){
    return memo + digit;
  }, 0)) % 10;
}

function dateToStr(date, opts){
  opts = opts || {};
  return (
    10000*date.getFullYear() +
    100*(date.getMonth()+1) +
    date.getDate()+''
  ).slice(opts.fullYear ? 0 : 2);
}

function check(birthDate, number){
  var digits = (dateToStr(birthDate)+number).split('');
  var lastDigit = +digits.pop();
  var checkSum = getChecksum(digits);
  return lastDigit === checkSum;
}

function getBirthDate(century, date, delimiter){
  var now = new Date();
  now.setHours(23);
  now.setMinutes(59);
  now.setSeconds(59);

  var thisYear = now.getFullYear();
  var thisCentury = (thisYear+'').slice(0, 2);

  var year = date.slice(0,2);
  var month = date.slice(2,4);
  var day = date.slice(4,6);

  if(month > 12 || day > 31) throw new TypeError('Invalid birth date: ' + date);

  if(century){
    return new Date(century+''+year, month-1, day);
  }else{
    var birthDate = new Date(thisCentury+''+year, month-1, day);

    if(birthDate > now)
      birthDate.setFullYear(birthDate.getFullYear() - 100);

    if(delimiter === '+')
      birthDate.setFullYear(birthDate.getFullYear() - 100);

    return birthDate;
  }
}

function between(val, min, max){
  return val >= min && val <= max;
}

function getRegion(number, year){
  var reg = number.slice(0,2);
  
  if(year >= 1990) return null;

  if(between(reg, '00', '13')){
    return 'Stockholms län';
  }else if(between(reg, '14', '15')){
    return 'Uppsala län';
  }else if(between(reg, '16', '18')){
    return 'Södermanlands län';
  }else if(between(reg, '19', '23')){
    return 'Östergötlands län';
  }else if(between(reg, '24', '26')){
    return 'Jönköpings län';
  }else if(between(reg, '27', '28')){
    return 'Kronobergs län';
  }else if(between(reg, '29', '31')){
    return 'Kalmar län';
  }else if(between(reg, '32', '32')){
    return 'Gotlands län';
  }else if(between(reg, '33', '34')){
    return 'Bleking län';
  }else if(between(reg, '35', '38')){
    return 'Kristianstad län';
  }else if(between(reg, '39', '45')){
    return 'Malmöhus län';
  }else if(between(reg, '46', '47')){
    return 'Hallands län';
  }else if(between(reg, '48', '54')){
    return 'Göteborgs och Bohus län';
  }else if(between(reg, '55', '58')){
    return 'Älvsborgs län';
  }else if(between(reg, '59', '61')){
    return 'Skaraborgs län';
  }else if(between(reg, '62', '64')){
    return 'Värmlands län';
  }else if(between(reg, '66', '68')){
    return 'Örebro län';
  }else if(between(reg, '69', '70')){
    return 'Västmanlands län';
  }else if(between(reg, '71', '73')){
    return 'Kopparbergs län';
  }else if(between(reg, '75', '77')){
    return 'Gävleborgs län';
  }else if(between(reg, '78', '81')){
    return 'Västernorrland län';
  }else if(between(reg, '82', '84')){
    return 'Jämtlands län';
  }else if(between(reg, '85', '88')){
    return 'Västerbottens län';
  }else if(between(reg, '89', '92')){
    return 'Norrbottens län';
  }else{
    return null;
  }
}

function getGender(number){
  return number.slice(2,3) % 2 === 0 ? FEMALE : MALE;
}

function parse(pernr){
  var parsed = pernr.match(PARSE_REGEX);
  if(!parsed[2] || !parsed[4]) throw new TypeError('Could not parse pernr: '+pernr);

  return {
    birthDate: getBirthDate(parsed[1], parsed[2], parsed[3]),
    number: parsed[4],
  };
}

// API
function Pernr(pernr){
  var data = parse(pernr);
  this.birthDate = data.birthDate;
  this.number = data.number;
  this.region = getRegion(this.number, this.birthDate.getFullYear());
  this.gender = getGender(this.number);
}

Pernr.prototype.getBirthDate = function(){
  return this.birthDate;
};

Pernr.prototype.getRegion = function(){
  return this.region;
};

Pernr.prototype.getGender = function(){
  return this.gender;
};

Pernr.prototype.isValid = function(){
  return check(this.birthDate, this.number);
};

Pernr.prototype.toString = function(opts){
  var delim =
    (new Date()).getFullYear() - this.birthDate.getFullYear() >= 100 ? '+' : '-';
  return dateToStr(this.birthDate, opts) + delim+ this.number;
};

Pernr.MALE = MALE;
Pernr.FEMALE = FEMALE;

// Module packaging
(function(global) {
  var API = Pernr;

  if (global.define && global.define.amd) {
    define([], API);
  } else if (typeof exports !== "undefined") {
    module.exports = API;
  } else {
    global.Pernr = API;
  }
})(this);
