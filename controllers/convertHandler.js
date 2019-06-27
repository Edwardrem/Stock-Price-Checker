/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    let num = (input.match(/[0-9/.]+/g) || [])[0]
    
    if(num === undefined) num = '1'
    if(num.split("/")[2]) return 'invalid number'
      
    try { num = eval(num) } 
    catch(e) { return 'invalid number' }

    return parseFloat(num.toFixed(5));
  };
  
  this.getUnit = function(input) {
    const units = ['gal','l','mi','km','lbs','kg'];
    let unit    = (input.match(/[a-zA-Z]+/g) || ['null'])[0].toLowerCase()
    
    if(units.indexOf(unit) === -1) return 'invalid unit'

    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    const input  = ['gal','l','mi','km','lbs','kg'];
    const output = ['l','gal','km','mi','kg','lbs'];
    
    return output[input.indexOf(initUnit)];
  };

  this.spellOutUnit = function(unit) {
    const input  = ['gal','l','mi','km','lbs','kg'];
    const output = ['gallons','liters','miles','kilometers','pounds','kilograms'];
    
    return output[input.indexOf(unit)]; 
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL  = 3.78541;
    const lbsToKg = 0.45359;
    const miToKm  = 1.60934;
    const kgToLbs = 2.20462;
    const lToGal  = 0.26417;
    const kmToMi  = 0.62137;
    
    const input   = ['gal','l','mi','km','lbs','kg'];
    const convert = [galToL,lToGal,miToKm,kmToMi,lbsToKg,kgToLbs];
    
    return parseFloat((initNum*convert[input.indexOf(initUnit)]).toFixed(5))
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
