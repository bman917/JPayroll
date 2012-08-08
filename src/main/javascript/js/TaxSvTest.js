
test('Test calcAnnualTax', function() {
    testCalcTax( 5000.00, 250.00);
    testCalcTax(10000.00, 500.00);
    testCalcTax(10001.00, 500.10);
    testCalcTax(35000.00, 3250.00);
})

function testCalcTax(annualIncome, expected) {
    var annualTax = calcAnnualTax(annualIncome);
    equal(annualTax, expected, 
         "Annual income: " + annualIncome 
             + ",  Annual Tax: " + annualTax);
}