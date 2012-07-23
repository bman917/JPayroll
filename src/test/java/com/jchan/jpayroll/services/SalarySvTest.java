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
     * Monthly: 10,000 Annual: 120,000
     */
    @Test
    public void testCalculateAnnual_Monthly() {
        BigDecimal result = basicTest("10000", ScheduleType.MONTHLY);
        assertEquals("Incorrect annual salary", 120000d, result.doubleValue(), 0);
    }

    /**
     * Semi-Monthly: 5,000 Annual: 120,000
     */
    @Test
    public void testCalculateAnnual_SemiMonthly() {
        BigDecimal result = basicTest("5000", ScheduleType.SEMI_MONTHLY);
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
    private BigDecimal basicTest(String amount, ScheduleType schedule) {
        Salary sal1 = new Salary(amount, schedule);
        return SalarySv.calculateAnnual(sal1);
    }
    
}
