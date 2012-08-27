/*
 *Helper class with a function to test if a give
 *number is between A & B ('first' and 'last')
 */
Number.prototype.between = function(first,last){
    return (first < last ? this >= first && this <= last : this >= last && this <= first);
}

/*
 *=================================================
 *    Personal Excemptions --- START
 *    RA 9504 SEC 4
 *    ftp://ftp.bir.gov.ph/webadmin1/pdf/11_ra_9504_minimum_wage.pdf
 *=================================================
 */

var phTaxExemptions = {
    single: 50000.00,
    married: 50000.00
};
var phTaxExemptionsPerDependent = 25000.00;

/*
 *Calculate Personal Exemption based on RA 9504 SEC 4
 *
 */
function calcPersonalTaxExemption(status, numOfDependents) {
    var total = 0;
    total += phTaxExemptions[status];
    
    if (numOfDependents > 4) numOfDependents = 4;
    total += phTaxExemptionsPerDependent * numOfDependents;
    return total;
}

/*
 *=================================================
 *    Personal Excemptions --- END
 *=================================================
 */


function calcOneMonthTax(status, numOfDependents, regMonthlyIncome, thisMonthsIncome, monthNumber, 
    ytdTotalTax, ytdIncome) {

    var tax =  calcAnnualTax2(status, numOfDependents, regMonthlyIncome, thisMonthsIncome, monthNumber, 
                ytdTotalTax, ytdIncome);
    
    var remainingMonths = 13 - monthNumber;
    
    tax.monthlyTax = tax.calcdRemainingTax/remainingMonths;
    
    return tax;
}

function calcAnnualTax2(status, numOfDependents, regMonthlyIncome, thisMonthsIncome, monthNumber,
    ytdTotalTax, ytdIncome) {
        
    var personalExemption = calcPersonalTaxExemption(status, numOfDependents);
        
    var remainingMonths = 13 - monthNumber;
    var projectedIncome = thisMonthsIncome + (regMonthlyIncome * (remainingMonths - 1)) + ytdIncome;
    
    var taxableIncome = projectedIncome - personalExemption;
    
    var proAnnualTax = calcAnnualTax(taxableIncome);
    var calcdRemainingTax = proAnnualTax - ytdTotalTax;
    
    var o = new Object();
    o.ytdIncome = (ytdIncome + thisMonthsIncome);
    o.projectedIncome = projectedIncome;
    o.personalExemption = personalExemption;
    o.ytdTotalTax = ytdTotalTax;
    o.calcdRemainingTax = calcdRemainingTax; 
    o.remainingMonths = remainingMonths;
    o.regMonthlyIncome = regMonthlyIncome;
    o.taxableIncome = taxableIncome;
    return o;
}

function calcMonthlyTax(income, type) {
    
}

/*
 * Not over P10,000………………………………… 5% 
 * Over P10,000 but not over P30,000……………… P500+10% of the excess over P10,000 
 * Over P30,000 but not over P70,000……………… P2,500+15% of the excess over P30,000 
 * Over P70,000 but not over P140,000…………… P8,500+20% of the excess over P70,000 
 * Over P140,000 but not over P250,000…………… P22,500+25% of the excess over P140,000 
 * Over P250,000 but not over P500,000…………… P50,000+30% of the excess over P250,000 
 * Over P500,000 …………………………………… P125,000+32% of the excess over P500,000
 */
function calcAnnualTax(annualTaxableIncome) {
    
    var bracket_1 = 10000;
    var bracket_2 = 30000;
    var bracket_3 = 70000;
    var bracket_4 = 140000;
    var bracket_5 = 250000;
    var bracket_6 = 500000;
    
    var income = annualTaxableIncome;
    
    if (income <= bracket_1) {
        return annualTaxableIncome * .05;
    }
    else if (income.between(bracket_1, bracket_2)) {
        return taxBracket(income, bracket_1, .10, 500);
    }
    else if (income.between(bracket_2, bracket_3)) {
        return taxBracket(income, bracket_2, .15, 2500);
    }
    else if (income.between(bracket_3, bracket_4)) {
        return taxBracket(income, bracket_3, .20, 8500);
    }  
    else if (income.between(bracket_4, bracket_5)) {
        return taxBracket(income, bracket_4, .25, 22500);
    }
    else if (income.between(bracket_5, bracket_6)) {
        return taxBracket(income, bracket_5, .30, 50000);
    }
    else {
        return taxBracket(income, bracket_6, .32, 125000);
    }  
    return annualTaxableIncome;
}

/*
 * Helper function that calculates a tax for a given bracket
 */
function taxBracket(income, bracket, percentage, addOn) {
    var taxOnExcess = (income - bracket) * percentage;
    return taxOnExcess + addOn
}





