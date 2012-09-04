test('Test Pag-ibig Contribution calculation', function() {

    var salary = 15000.00; var expected = "300.00"; var result = calculatePagIbigEmployeeContribution(salary);
    equal(result, expected, "Monthly Income: " + salary + " | Pag-ibig Contribution: " + result);
    
    salary = 11000.00; expected = "220.00"; result = calculatePagIbigEmployeeContribution(salary);
    equal(result, expected, "Monthly Income: " + salary + " | Pag-ibig Contribution: " + result);

})

test('Test Phil health Contribution calculation', function() {
    
    var salary = 10000.00; var expected = "125.00"; var result = calculatePhilHealthEmployeeContribution(salary);
    equal(result, expected, "Monthly Income: " + salary + " | Employee Contribution: " + result);
    
    salary = 15000.00; expected = "187.50"; result = calculatePhilHealthEmployeeContribution(salary);
    equal(result, expected, "Monthly Income: " + salary + " | Employee Contribution: " + result);
    
    salary = 25000.00; expected = "312.50"; result = calculatePhilHealthEmployeeContribution(salary);
    equal(result, expected, "Monthly Income: " + salary + " | Employee Contribution: " + result);

    salary = 2000.00; expected = "50.00"; result = calculatePhilHealthEmployeeContribution(salary);
    equal(result, expected, "Monthly Income: " + salary + " | Employee Contribution: " + result);

    salary = 30000.00; expected = "375.00"; result = calculatePhilHealthEmployeeContribution(salary);
    equal(result, expected, "Monthly Income: " + salary + " | Employee Contribution: " + result);

    salary = 50000.00; expected = "375.00"; result = calculatePhilHealthEmployeeContribution(salary);
    equal(result, expected, "Monthly Income: " + salary + " | Employee Contribution: " + result);
	
	
	

})

test('Test SSS Contribution calculation', function() {
    
    var salary = 10000.00; var ee = "333.30"; var result = calcSSSContribution(salary);
    equal(result.ee, ee, "Monthly Income: " + salary + " | ER: " + result.er + " | EE: " + result.ee);
    
    salary = 5250.00; ee = "183.30"; result = calcSSSContribution(salary);
    equal(result.ee, ee, "Monthly Income: " + salary + " | ER: " + result.er + " | EE: " + result.ee);

    salary = 7749.99; ee = "250.00"; result = calcSSSContribution(salary);
    equal(result.ee, ee, "Monthly Income: " + salary + " | ER: " + result.er + " | EE: " + result.ee);

    salary = 30000.00; ee = "500.00"; result = calcSSSContribution(salary);
    equal(result.ee, ee, "Monthly Income: " + salary + " | ER: " + result.er + " | EE: " + result.ee);

    salary = 14000.00; ee = "466.70"; result = calcSSSContribution(salary);
    equal(result.ee, ee, "Monthly Income: " + salary + " | ER: " + result.er + " | EE: " + result.ee);


});

test('Test Personal Exemption calculation', function() {
    
    var status = 'single';
    var dependents = 0;
    var expected = 50000;
    
    var calcdExempt = calcPersonalTaxExemption(status, dependents);
    
    equal(calcdExempt, expected, 
         "Status: '" + status + "' | Dependents: " + dependents + " | Personal Exemption: " + calcdExempt);

    status = 'married';
    equal(calcdExempt, expected, 
         "Status: '" + status + "' | Dependents: " + dependents + " | Personal Exemption: " + calcdExempt);

    //Single with 1 dependent
    dependents = 1;
    expected = 75000.00; //50000 + 25000 = 75000
    calcdExempt = calcPersonalTaxExemption(status, dependents);
     
    equal(calcdExempt, expected, 
         "Status: '" + status + "' | Dependents: " + dependents + " | Personal Exemption: " + calcdExempt);

    //Single with 3 dependents
    dependents = 2;
    expected = 100000.00; //50000 + 50000 = 100000
    calcdExempt = calcPersonalTaxExemption(status, dependents);
     
    equal(calcdExempt, expected, 
         "Status: '" + status + "' | Dependents: " + dependents + " | Personal Exemption: " + calcdExempt);

    //Single with 4 dependents
    dependents = 4;
    expected = 150000.00; //50000 + 100000 = 150000
    calcdExempt = calcPersonalTaxExemption(status, dependents);
     
    equal(calcdExempt, expected, 
         "Status: '" + status + "' | Dependents: " + dependents + " | Personal Exemption: " + calcdExempt);

    //Single with 10 dependents
    dependents = 10;
    expected = 150000.00; //50000 + 100000 = 150000
    calcdExempt = calcPersonalTaxExemption(status, dependents);
     
    equal(calcdExempt, expected, 
         "Status: '" + status + "' | Dependents: " + dependents + " | Personal Exemption: " + calcdExempt);

});




test('Test monthly tax calculation', function () {
    
    var status = 'single';
    var dependents = 0;
    var ytdTax = 0;
    var ytdInc = 0;
    var tax;
    // regMonthlyIncome, oneMonthIncomeToTax, monthNumber,ytdTotalTax, ytdIncome, expected 
    tax = testCalcMonthlyTax(status, dependents, 15000,15000, 1, ytdTax, ytdInc,1510.83); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    tax = testCalcMonthlyTax(status, dependents, 15000,15000, 2, ytdTax, ytdInc,1510.83); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    tax = testCalcMonthlyTax(status, dependents, 15000,10000, 3, ytdTax, ytdInc,520.08); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    tax = testCalcMonthlyTax(status, dependents, 15000,15000, 4, ytdTax, ytdInc,1509.81); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    tax = testCalcMonthlyTax(status, dependents, 15000,15000, 5, ytdTax, ytdInc,1509.81); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    tax = testCalcMonthlyTax(status, dependents, 15000,15000, 6, ytdTax, ytdInc,1509.81); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    tax = testCalcMonthlyTax(status, dependents, 15000,15000, 7, ytdTax, ytdInc,1509.81); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    tax = testCalcMonthlyTax(status, dependents, 15000,15000, 8, ytdTax, ytdInc,1509.81); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    tax = testCalcMonthlyTax(status, dependents, 15000,15000, 9, ytdTax, ytdInc,1509.81); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    tax = testCalcMonthlyTax(status, dependents, 15000,15000, 10, ytdTax, ytdInc,1509.81); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    tax = testCalcMonthlyTax(status, dependents, 15000,15000, 11, ytdTax, ytdInc,1509.81); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    tax = testCalcMonthlyTax(status, dependents, 15000,15000, 12, ytdTax, ytdInc,1509.81); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
    
    tax = testCalcMonthlyTax(status, dependents, 32000,32000, 1, 0, 0,5812.17);
    tax = testCalcMonthlyTax(status, dependents, 55000,55000, 1, 0, 0,12718);
	
	
	ytdTax = 0;
    ytdInc = 0;
	dependents = 3;
	
	tax = testCalcMonthlyTax(status, dependents, 11000,11000, 1, ytdTax, ytdInc,12718); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
	tax = testCalcMonthlyTax(status, dependents, 11000,11000, 2, ytdTax, ytdInc,12718); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
	tax = testCalcMonthlyTax(status, dependents, 11000,11000, 3, ytdTax, ytdInc,12718); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
	tax = testCalcMonthlyTax(status, dependents, 11000,11000, 4, ytdTax, ytdInc,12718); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
	tax = testCalcMonthlyTax(status, dependents, 11000,11000, 5, ytdTax, ytdInc,12718); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
	tax = testCalcMonthlyTax(status, dependents, 11000,11000, 6, ytdTax, ytdInc,12718); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
	tax = testCalcMonthlyTax(status, dependents, 32000,32000, 7, ytdTax, ytdInc,12718); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
	tax = testCalcMonthlyTax(status, dependents, 32000,32000, 8, ytdTax, ytdInc,12718); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
	tax = testCalcMonthlyTax(status, dependents, 32000,27000, 9, ytdTax, ytdInc,12718); ytdTax += tax.monthlyTax; ytdInc = tax.ytdIncome;
	
});

function testCalcMonthlyTax(status, dependents, regMonthlyIncome, oneMonthIncomeToTax, monthNumber,
    ytdTotalTax, ytdIncome, expected) {

    
    var annualTax = calcAnnualTax(regMonthlyIncome * 12);
    
    var tax = calcOneMonthTax(status, dependents, regMonthlyIncome, oneMonthIncomeToTax, 
                        monthNumber, ytdTotalTax, ytdIncome);
    
    var oneMonth = tax.monthlyTax;
    var roundedOneMonth = Math.round(oneMonth * 100)/100;
    
    equal(roundedOneMonth, expected, 
             "This Month's Inc: " + formatNumber(oneMonthIncomeToTax)
             + " | Monthly Tax: " + formatNumber(roundedOneMonth)
             + " | Proj. Annual Inc: " + formatNumber(tax.projectedIncome)
             + " | Persnl Exempt: " + formatNumber(tax.personalExemption)
             + " | Contributions: " + formatNumber(tax.contributions)
             + " | Annual Taxable Inc: " + formatNumber(tax.taxableIncome)
             + " | Ytd Inc: " + formatNumber(tax.ytdIncome)
             + " | Ytd Tax: " + formatNumber(tax.ytdTotalTax)
             + " | Remaining Months: " + tax.remainingMonths);

    return tax;
}

test('Test calcAnnualTax', function() {
    testCalcTax( 5000.00, 250.00);
    testCalcTax(10000.00, 500.00);
    testCalcTax(10001.00, 500.10);
    testCalcTax(35000.00, 3250.00);
    testCalcTax(100000.00, 14500.00);
    testCalcTax(113150, 17130);
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
