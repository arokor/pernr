# Pernr

Pernr is a minimal library for parsing and validating Swedish national
identification numbers (personnummer, samordningsnummer).

## Usage
    var pernr = new Pernr('890101-4251');

    var date = pernr.getBirthDate(); // date object for January 1 1989
    var gender = pernr.getGender(); // male
    var region = pernr.getRegion(); // Malmöhus Län
    var isValid = pernr.isValid(); // true
    var str = pernr.toString(); // 890101-4251
    var str2 = pernr.toString({fullYear:true}); // 19890101-4251

Follow [@AronKornhall](http://twitter.com/AronKornhall) for news and updates
regarding this library.

## Install
Node

    npm install pernr

Browser

    bower install pernr
    or download pernr.js

## Test
    npm test

## Reference

### Pernr(pernrStr)

Constructor to create a new Pernr instance for the string `pernrStr`

__Arguments__
 
    pernrStr  {String} a string representation of the identification number. Allowed
              formats are:
                  yymmdd-xxxx
                yyyymmdd-xxxx
                  yymmddxxxx
                yyyymmddxxxx
                  yymmdd+xxxx (plus sign indicates that the person is older than 100 years)

---------

### Pernr##getBirthDate()

returns a date object for the persons birth date.

---------

### Pernr##getGender()

returns the persons gender. Possible values are Pernr.MALE and Pernr.FEMALE

---------

### Pernr##getRegion()

returns the region where the person was born. This infomation is only available for
identification numbers older than Jan 1 1990.

---------

### Pernr##isValid()

returns true if this is a valid identification number (the last digit is a checksum)

---------

### Pernr##toString(opts)

returns a string represenation of the pernr. if opts.fullYear is true the extended
representation is used

## Note on "reservnummer"

"Reservnummer" is used in some special cases. There are only recommendations how it should be formatted, no formalized standard.

You can read more about it on [wikipedia](https://sv.wikipedia.org/wiki/Reservnummer#Format).

## License 

(The MIT License)

Copyright (c) 2014 Aron Kornhall <aron@kornhall.se>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
