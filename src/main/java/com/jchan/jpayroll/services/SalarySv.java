/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jchan.jpayroll.services;

import com.jchan.jpayroll.comparators.SalaryBasicComparator;
import com.jchan.jpayroll.model.Salary;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Mr Jacky
 */
public class SalarySv {
    
     final static Logger logger = LoggerFactory.getLogger(SalarySv.class);
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
    
    /**
     * Sorts a list of Salaries by effective date.
     * TAKE NOTE: This method modifies the order of Salaries in the list parameter.
     * @return 
     */
    public static List<Salary> sortByEffectiveDate(List<Salary> list)
    {
        logger.info("Sorting Salaries by EffectiveDate");
         Collections.sort(list, new SalaryBasicComparator());
         return list;
    }
    
}
