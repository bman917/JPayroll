/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jchan.jpayroll.services;

import com.jchan.jpayroll.model.Salary;
import java.math.BigDecimal;

/**
 *
 * @author Mr Jacky
 */
public class SalarySv {
    
    /**
     * Calculates the annual salary amount.
     * 
     * @param salary
     * @return 
     */
    public static BigDecimal calculateAnnual(Salary salary) {
        
        BigDecimal amount = salary.getAmount();
        
        switch (salary.getType())
        {
            case MONTHLY:
                return amount.multiply(new BigDecimal("12"));
            case SEMI_MONTHLY:
                return amount.multiply(new BigDecimal("24"));
            default:
                throw new RuntimeException("Unsupported Salary Schedule: " + salary.getType());
        }
    }
    
}
