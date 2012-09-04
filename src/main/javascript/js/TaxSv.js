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
    
    var sssAnnualContrib = calcSSSContribution(regMonthlyIncome).ee * 12;
    var philHealthAnnualContrib = calculatePhilHealthEmployeeContribution(regMonthlyIncome) * 12;
    var pagIbigAnnualContrib = calculatePagIbigEmployeeContribution(regMonthlyIncome) * 12;
    
    var contributions = sssAnnualContrib + philHealthAnnualContrib + pagIbigAnnualContrib;
    if (contributions > 30000) contributions = 30000;
    
        
    var remainingMonths = 12 - monthNumber;
    var projectedIncome = thisMonthsIncome + (thisMonthsIncome * (remainingMonths)) + ytdIncome;
    
    var taxableIncome = projectedIncome - personalExemption - contributions;
    
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
    o.contributions = contributions;
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



function calcSSSContribution(monthlyIncome) {
    
    var inc = monthlyIncome;
    var o = new Object();
    
    if (inc.between(1000, 1249.99))      { o.er =  70.70; o.ee = 33.30; }
    else if (inc.between(1250, 1749.99)) {o.er = 106.00; o.ee = 50.00; }
    else if (inc.between(1750, 2249.99)) {o.er = 141.30; o.ee = 66.70; }
    else if (inc.between(2250, 2749.99)) {o.er = 176.70; o.ee = 83.30; }
    else if (inc.between(2750, 3249.99)) {o.er = 212.00; o.ee = 100.00; }
    else if (inc.between(3250, 3749.99)) {o.er = 247.30; o.ee = 116.70; }
    else if (inc.between(3750, 4249.99)) {o.er = 282.70; o.ee = 133.30; }
    else if (inc.between(4250, 4749.99)) {o.er = 318.00; o.ee = 150.00; }
    else if (inc.between(4750, 5249.99)) {o.er = 353.30; o.ee = 166.70; }
    else if (inc.between(5250, 5749.99)) {o.er = 388.70; o.ee = 183.30; }
    else if (inc.between(5750, 6249.99)) {o.er = 424.00; o.ee = 200.00; }
    else if (inc.between(6250, 6749.99)) {o.er = 459.30; o.ee = 216.70; }
    else if (inc.between(6750, 7249.99)) {o.er = 494.70; o.ee = 233.30; }
    else if (inc.between(7250, 7749.99)) {o.er = 530.00; o.ee = 250.00; }
    else if (inc.between(7750, 8249.99)) {o.er = 565.30; o.ee = 266.70; }
    else if (inc.between(8250, 8749.99)) {o.er = 600.70; o.ee = 283.30; }
    else if (inc.between(8750, 9249.99)) {o.er = 636.00; o.ee = 300.00; }
    else if (inc.between(9250, 9749.99)) {o.er = 671.30; o.ee = 316.70; }
    else if (inc.between(9750, 10249.99)) {o.er = 706.70; o.ee = 333.30; }
    else if (inc.between(10250,10749.99)) {o.er = 742.00; o.ee = 350.00; }
    else if (inc.between(10750,11249.99)) {o.er = 777.30; o.ee = 366.70; }
    else if (inc.between(11250,11749.99)) {o.er = 812.70; o.ee = 383.30; }
    else if (inc.between(11750,12249.99)) {o.er = 848.00; o.ee = 400.00 }
    else if (inc.between(12250,12749.99)) {o.er = 883.33; o.ee = 416.70; }
    else if (inc.between(12750,13249.99)) {o.er = 918.70; o.ee = 433.30; }
    else if (inc.between(13250,13749.99)) {o.er = 954.00; o.ee = 450.00; }
    else if (inc.between(13750,14249.99)) {o.er = 989.30; o.ee = 466.70; }
    else if (inc.between(14250,14749.99)) {o.er = 1024.70; o.ee = 483.30; }
    else if (inc >= 14750) {o.er = 1060.00; o.ee = 500.00; }
    
    return o;
}


function calculatePhilHealthEmployeeContribution(monthlyIncome) {
    if (monthlyIncome < 5000) return 50;
    else if (monthlyIncome >= 30000) return 375;
    else return (Math.floor(monthlyIncome/1000) * 25) / 2;
}


function calculatePagIbigEmployeeContribution(monthlyIncome) {
    var contrib = 0;
    
    if (monthlyIncome < 1500) contrib = monthlyIncome * .01;
    else contrib = monthlyIncome * .02;
    
    //if (contrib > 100) contrib = 100;
    
    return contrib;
}
