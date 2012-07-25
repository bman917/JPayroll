/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jchan.jpayroll.services;

import com.jchan.jpayroll.common.ScheduleType;
import com.jchan.jpayroll.model.Salary;
import java.math.BigDecimal;
import java.util.Calendar;
import org.junit.AfterClass;
import org.junit.Test;
import org.junit.BeforeClass;
import static org.junit.Assert.assertEquals;

/**
 *
 * @author Mr Jacky
 */
public class SalarySvTest {

    public SalarySvTest() {
    }

    @BeforeClass
    public static void setUpClass() throws Exception {
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
    }
    
    /**
     * Test calculation of Monthly and Semi Monthly thirteenth month pay.
     * 
     * Monthly: 10,000 EffectiveDate: January  13thMonth: 10,000
     * Monthly: 10,000 EffectiveDate: June     13thMonth: 5,000
     * Monthly: 10,000 EffectiveDate: June (last year) 13thMonth: 10,000
     */
    @Test
    public void testCalculateThirteenthMonth_Monthly_SemiMonthly() {
        
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        
        double salAmount = 10000;
        String salEffectDate = "01/01/" + currentYear;
        
        BigDecimal result = SalarySv.calculateThirteenthMonth(salAmount, 
                ScheduleType.MONTHLY, salEffectDate, currentYear);
        assertEquals("Incorrect 13th Month pay", 10000d, result.doubleValue(), .0001);
        
        salEffectDate = "01/07/" + currentYear;
        result = SalarySv.calculateThirteenthMonth(salAmount, 
                ScheduleType.MONTHLY, salEffectDate, currentYear); 
        
        assertEquals("Incorrect 13th Month pay", 5000, result.doubleValue(), .0001);
    }
    
    /**
     * Monthly: 10,000 Annual: 120,000
     */
    @Test
    public void testCalculateAnnual_Monthly() {
        BigDecimal result = basicCalculateAnnualSalaryTest("10000", ScheduleType.MONTHLY);
        assertEquals("Incorrect annual salary", 120000d, result.doubleValue(), 0);
    }

    /**
     * Semi-Monthly: 5,000 Annual: 120,000
     */
    @Test
    public void testCalculateAnnual_SemiMonthly() {
        BigDecimal result = basicCalculateAnnualSalaryTest("5000", ScheduleType.SEMI_MONTHLY);
        assertEquals("Incorrect annual salary", 120000d, result.doubleValue(), 0);
    }
    
    /**
     * Convenience method for testing.
     *
     * Creates a Salary object based on the passed parameters and calculates the
     * annual amount for that salary.
     *
     * @param amount
     * @param schedule
     * @return
     */
    private BigDecimal basicCalculateAnnualSalaryTest(String amount, ScheduleType schedule) {
        Salary sal1 = new Salary(amount, schedule);
        return SalarySv.calculateAnnual(sal1);
    }
    
}
