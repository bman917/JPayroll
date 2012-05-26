/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jchan.jpayroll.services;

import com.jchan.jpayroll.common.ScheduleType;
import com.jchan.jpayroll.model.Salary;
import java.math.BigDecimal;
import org.junit.AfterClass;
import org.junit.Test;
import org.junit.BeforeClass;

/**
 *
 * @author Mr Jacky
 */
public class TaxSvTest {
    
    public TaxSvTest() {
    }

    @BeforeClass
    public static void setUpClass() throws Exception {
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
    }

    @Test
    public void testCalculateAnnualTax() {
        
        
        Salary salary = new Salary("35000", ScheduleType.MONTHLY);
        BigDecimal annualSalary = SalarySv.calculateAnnual(salary);
        
        System.out.println("Monthly Salary: " + salary.getAmount() 
                + ", Annual Tax: " + TaxSv.calculateAnnualTax(annualSalary) 
                + ", Manthly Tax: " + TaxSv.calculateMonthlyTax(annualSalary));
    }
}
