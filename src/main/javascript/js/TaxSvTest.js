
test('Test Personal Exemption calculation', function() {
    
    var status = 'single';
    var dependents = 0;
    var expected = 50000;
    
    var calcdExempt = calcPersonalTaxExemption(status, dependents);
    
    equal(calcdExempt, expected, 
         " | Status: '" + status + "' | Dependents: " + dependents + " | Personal Exemption: " + calcdExempt);

    status = 'married';
    equal(calcdExempt, expected, 
         " | Status: '" + status + "' | Dependents: " + dependents + " | Personal Exemption: " + calcdExempt);

    //Single with 1 dependent
    dependents = 1;
    expected = 75000.00; //50000 + 25000 = 75000
    calcdExempt = calcPersonalTaxExemption(status, dependents);
     
    equal(calcdExempt, expected, 
         " | Status: '" + status + "' | Dependents: " + dependents + " | Personal Exemption: " + calcdExempt);

    //Single with 3 dependents
    dependents = 2;
    expected = 100000.00; //50000 + 50000 = 100000
    calcdExempt = calcPersonalTaxExemption(status, dependents);
     
    equal(calcdExempt, expected, 
         " | Status: '" + status + "' | Dependents: " + dependents + " | Personal Exemption: " + calcdExempt);

    //Single with 4 dependents
    dependents = 4;
    expected = 150000.00; //50000 + 100000 = 150000
    calcdExempt = calcPersonalTaxExemption(status, dependents);
     
    equal(calcdExempt, expected, 
         " | Status: '" + status + "' | Dependents: " + dependents + " | Personal Exemption: " + calcdExempt);

    //Single with 10 dependents
    dependents = 10;
    expected = 150000.00; //50000 + 100000 = 150000
    calcdExempt = calcPersonalTaxExemption(status, dependents);
     
    equal(calcdExempt, expected, 
         " | Status: '" + status + "' | Dependents: " + dependents + " | Personal Exemption: " + calcdExempt);

});





test('Test monthly tax calculation', function () {
    
    var status = 'single';
    var dependents = 0;
    var ytdTax = 0;
    var ytdInc = 0;
    var tax;
    // regMonthlyIncome, oneMonthIncomeToTax, monthNumber,ytdTotalTax, ytdIncome, expected 
    tax = testCalcMonthlyTax(status, dependents, 15000,15000, 1, ytdTax, ytdInc,1708.33); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    tax = testCalcMonthlyTax(status, dependents, 15000,15000, 2, ytdTax, ytdInc,1708.33); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    tax = testCalcMonthlyTax(status, dependents, 15000,10000, 3, ytdTax, ytdInc,1608.33); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    tax = testCalcMonthlyTax(status, dependents, 15000,15000, 4, ytdTax, ytdInc,1608.33); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
});

function testCalcMonthlyTax(status, dependents, regMonthlyIncome, oneMonthIncomeToTax, monthNumber,
    ytdTotalTax, ytdIncome, expected) {

    
    var annualTax = calcAnnualTax(regMonthlyIncome * 12);
    
    var tax = calcOneMonthTax(status, dependents, regMonthlyIncome, oneMonthIncomeToTax, 
                        monthNumber, ytdTotalTax, ytdIncome);
    
    var oneMonth = tax.monthlyTax;
    var roundedOneMonth = Math.round(oneMonth * 100)/100;
    
    equal(roundedOneMonth, expected, 
             " | This month's income: " + formatNumber(oneMonthIncomeToTax)
             + " | Proj Inc: " + formatNumber(tax.projectedIncome)
             + " | Ytd Inc: " + formatNumber(tax.ytdIncome)
             + " | Ytd Tax: " + formatNumber(tax.ytdTotalTax)
             + " | Persnl Exempt: " + formatNumber(tax.personalExemption)
             + " | Annual Taxable Inc: " + formatNumber(tax.taxableIncome)
             + " | Monthly Tax: " + formatNumber(roundedOneMonth)
             + " | Remaining Months: " + tax.remainingMonths);

    return tax;
}

test('Test calcAnnualTax', function() {
    testCalcTax( 5000.00, 250.00);
    testCalcTax(10000.00, 500.00);
    testCalcTax(10001.00, 500.10);
    testCalcTax(35000.00, 3250.00);
    testCalcTax(100000.00, 14500.00);
    testCalcTax(200000.00, 37500.00);
    testCalcTax(300000.00, 65000.00);
    testCalcTax(700000.00, 189000.00);
    testCalcTax(1122000.00, 9923.63);
})

function testCalcTax(annualIncome, expected) {
    
    var annualTax = calcAnnualTax(annualIncome);
    
    var monthlyIncome = formatNumber(annualIncome/12);
    var monthlyTax = formatNumber(annualTax/12);
    
    equal(annualTax, expected, 
         "Annual income: " + formatNumber(annualIncome)
             + " | Monthly income: " + monthlyIncome
             + " | Annual Tax: " + formatNumber(annualTax)
             + " | Monthly Tax: " + monthlyTax);
}

function formatNumber(nStr)
{
  nStr = Math.round((nStr) * 100) / 100;
  
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
