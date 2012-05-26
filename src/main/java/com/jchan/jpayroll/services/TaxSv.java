/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jchan.jpayroll.services;

import com.jchan.jpayroll.model.Salary;
import java.math.BigDecimal;
import java.math.MathContext;

/**
 * REPUBLIC ACT NO. 8424
 * TAX REFORM ACT OF 1997
 * CHAPTER III - TAX ON INDIVIDUALS
 * SEC. 24. Income Tax Rates. 
 * 
 * @author Mr Jacky
 */
public class TaxSv {
    
    public static MathContext context = MathContext.DECIMAL32;
    
    /*
     * 
      Not over P10,000………………………………… 5% 
Over P10,000 but not over P30,000……………… P500+10% of the excess over P10,000 
Over P30,000 but not over P70,000……………… P2,500+15% of the excess over P30,000 
Over P70,000 but not over P140,000……..……… P8,500+20% of the excess over P70,000 
Over P140,000 but not over P250,000…………… P22,500+25% of the excess over P140,000 
Over P250,000 but not over P500,000…………… P50,000+30% of the excess over P250,000 
Over P500,000 …………………………………… P125,000+32% of the excess over P500,000
     */
    
    public static BigDecimal calculateAnnualTax(BigDecimal annualIncome) {
        
        BigDecimal bracket_1 = new BigDecimal(10000);
        BigDecimal bracket_2 = new BigDecimal(30000);
        BigDecimal bracket_3 = new BigDecimal(70000);
        BigDecimal bracket_4 = new BigDecimal(140000);
        BigDecimal bracket_5 = new BigDecimal(250000);
        BigDecimal bracket_6 = new BigDecimal(500000);
        
        //Not over P10,000………………………………… 5% 
        if (annualIncome.compareTo(bracket_1) < 1)
        {
            return annualIncome.multiply(new BigDecimal(".05"));
        }
        //Over P10,000 but not over P30,000……………… P500+10% of the excess over P10,000 
        else if (annualIncome.compareTo(bracket_2) < 1)
        {
            BigDecimal taxOnExcess = annualIncome.subtract(bracket_1).multiply(new BigDecimal(".10"));
            return taxOnExcess.add(new BigDecimal(500));
        }
         //Over P30,000 but not over P70,000……………… P2,500+15% of the excess over P30,000 
        else if (annualIncome.compareTo(bracket_3) < 1)
        {
            BigDecimal taxOnExcess = annualIncome.subtract(bracket_2).multiply(new BigDecimal(".15"));
            return taxOnExcess.add(new BigDecimal(2500));
        }
         //Over P70,000 but not over P140,000……..……… P8,500+20% of the excess over P70,000 
        else if (annualIncome.compareTo(bracket_4) < 1)
        {
            BigDecimal taxOnExcess = annualIncome.subtract(bracket_3).multiply(new BigDecimal(".20"));
            return taxOnExcess.add(new BigDecimal(8500));
        }   
         //Over P140,000 but not over P250,000…………… P22,500+25% of the excess over P140,000 
        else if (annualIncome.compareTo(bracket_5) < 1)
        {
            BigDecimal taxOnExcess = annualIncome.subtract(bracket_4).multiply(new BigDecimal(".25"));
            return taxOnExcess.add(new BigDecimal(22500));
        }    
         //Over P250,000 but not over P500,000…………… P50,000+30% of the excess over P250,000 
        else if (annualIncome.compareTo(bracket_6) < 1)
        {
            BigDecimal taxOnExcess = annualIncome.subtract(bracket_5).multiply(new BigDecimal(".30"));
            return taxOnExcess.add(new BigDecimal(50000));
        }  
         //Over P500,000 …………………………………… P125,000+32% of the excess over P500,000 
        else
        {
            BigDecimal taxOnExcess = annualIncome.subtract(bracket_6).multiply(new BigDecimal(".32"));
            return taxOnExcess.add(new BigDecimal(125000));
        } 
    }
    
    public static BigDecimal calculateMonthlyTax(BigDecimal annualIncome) {
        
        BigDecimal annualTax = calculateAnnualTax(annualIncome);
        return annualTax.divide(new BigDecimal(12), context);
    }
}
