/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jchan.jpayroll.services;

import com.jchan.jpayroll.common.ScheduleType;
import com.jchan.jpayroll.comparators.SalaryBasicComparator;
import com.jchan.jpayroll.model.Salary;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.List;
import org.junit.AfterClass;
import org.junit.Test;
import org.junit.BeforeClass;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import static org.junit.Assert.*;

/**
 *
 * @author Mr Jacky
 */
public class TaxSvTest {
    
    final Logger logger = LoggerFactory.getLogger(TaxSvTest.class);

    public TaxSvTest() {
    }

    @BeforeClass
    public static void setUpClass() throws Exception {
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
    }

    /**
     * I have no valid test data yet. For now, the goal of this test is to
     * simply run without any runtime errors.
     */
    @Test
    public void testCalculateAnnualTax() {

        /*
         * This should be removed at some point. A UI should be created for
         * manual testing..
         */
        
        Salary salary = new Salary("30000", ScheduleType.MONTHLY);
        BigDecimal annualSalary = SalarySv.calculateAnnual(salary);
        
        logger.info("Monthly Salary: " + salary.getAmount()
                + ", Annual Tax: " + TaxSv.calcAnnualTax(annualSalary)
                + ", Manthly Tax: " + TaxSv.calcMonthlyTax(annualSalary));
        
        final String msg = "Incorrect computation of Annual Tax";
        /*
         * Now do some REAL testing....
         */
        assertEquals(msg, "250.00", TaxSv.calcAnnualTax(new BigDecimal("5000")).toString());
        assertEquals(msg, "500.00", TaxSv.calcAnnualTax(new BigDecimal("10000")).toString());
        assertEquals(msg, "500.10", TaxSv.calcAnnualTax(new BigDecimal("10001")).toString());
        assertEquals(msg, "3250.00", TaxSv.calcAnnualTax(new BigDecimal("35000")).toString());
        assertEquals(msg, "14500.00", TaxSv.calcAnnualTax(new BigDecimal("100000")).toString());
        assertEquals(msg, "37500.00", TaxSv.calcAnnualTax(new BigDecimal("200000")).toString());
        assertEquals(msg, "65000.00", TaxSv.calcAnnualTax(new BigDecimal("300000")).toString());
        assertEquals(msg, "189000.00", TaxSv.calcAnnualTax(new BigDecimal("700000")).toString());
    }
    

    
    /**
     * Attempt to calculate the annual tax where in two or more
     * different salaries are involved. 
     * 
     * For example, an employee may have an increase in the middle of the year.
     * This his income tax will have to change in proportionate to his increased annual income.
     */
    @Test
    public void testCalucateTaxForVariableSalary() {
        
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        logger.info("Current Year: " + currentYear);
        
        /*
         * First we will test this method with only 1 Salary. 
         * Using this calcAnnualTax(List<Salary>, year) and 
         * calcAnnualTax(annualIncome) should give the same result.
         */
        
        int monthly1 = 10000;
        int annualIncome1 = monthly1 * 12;
        
        BigDecimal annualTax1 = TaxSv.calcAnnualTax(new BigDecimal(annualIncome1));
        
        /*
         * Create the first Salary. NOTE: the date is in the PAST (January last year)
         */
        Salary s1 = new Salary(String.valueOf(monthly1), 
                ScheduleType.MONTHLY, "01/01/" + (currentYear - 1));

        List<Salary> salaryList = new ArrayList<Salary>();
        salaryList.add(s1);

        BigDecimal result1 = TaxSv.calcAnnualTax(salaryList, currentYear);
        
        assertEquals("Incorrect computation of Annual Tax", annualTax1, result1);
        
        /*
         * Now we will introduce a second salary. Starting May of the current year,
         * the salary has 'doubled'.
         */
        Salary s2 = new Salary(String.valueOf(monthly1 * 2), ScheduleType.MONTHLY, "01/05/" + currentYear);
        salaryList.add(s2);
        
        BigDecimal result2 = TaxSv.calcAnnualTax(salaryList, currentYear);
        
        logger.info("Annual Tax: " + result2);
        
        assertEquals("Incorrect computation of Annual Tax", "37500.00", result2.toString());
    }
    
   /**
     * Attempt to calculate the annual tax rate wherein the salary for the 
     * given calendar year is incomplete.
     * 
     * For example, if the employee only started working on May of the current year,
     * then the annual income should be computed for May until December.
     * 
     */
    @Test
    public void testCalucateTaxForIncompleteCalendarYearSalary() {
        
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        logger.info("Current Year: " + currentYear);
     
         List<Salary> salaryList = new ArrayList<Salary>();
         
        Salary s = new Salary("10000", ScheduleType.MONTHLY, "01/05/" + currentYear);
        salaryList.add(s);
        
        BigDecimal result = TaxSv.calcAnnualTax(salaryList, currentYear);
        
        logger.info("Annual Tax: " + result);
        
        assertEquals("Incorrect computation of Annual Tax", "10500.00", result.toString());
        
    }

}
