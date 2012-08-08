Number.prototype.between = function(first,last){
    return (first < last ? this >= first && this <= last : this >= last && this <= first);
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
function calcAnnualTax(annualIncome) {
    
    var bracket_1 = 10000;
    var bracket_2 = 30000;
    var bracket_3 = 70000;
    var bracket_4 = 140000;
    var bracket_5 = 250000;
    var bracket_6 = 500000;
    
    var income = annualIncome;
    
    if (income <= bracket_1) {
        return annualIncome * .05;
    }
    else if (income.between(bracket_1, bracket_2)) {
        var taxOnExcess = (income - bracket_1) * .10;
        return taxOnExcess + 500.00;
    }
    else if (income.between(bracket_2, bracket_3)) {
        var taxOnExcess = (income - bracket_2) * .15;
        return taxOnExcess + 2500.00;
    }
    
    return annualIncome;
}




