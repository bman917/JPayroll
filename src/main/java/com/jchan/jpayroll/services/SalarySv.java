/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jchan.jpayroll.services;

import com.jchan.jpayroll.common.ScheduleType;
import com.jchan.jpayroll.comparators.SalaryBasicComparator;
import com.jchan.jpayroll.model.Salary;
import java.math.BigDecimal;
import java.util.Calendar;
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
    final static BigDecimal MONTHS_IN_YEAR = new BigDecimal("12");
    final static BigDecimal SEMI_MONTHS_IN_YEAR = new BigDecimal("24");

    /**
     * Calculates the annual income amount excluding any bonuses like thirteenth
     * month pay.
     *
     * Salary ScheduleType supported: - MONTHLY - SEMI_MONTHLY
     *
     * @param salary
     */
    public static BigDecimal calculateAnnual(Salary salary) {

        BigDecimal amount = salary.getAmount();

        switch (salary.getType()) {
            case MONTHLY:
                return amount.multiply(MONTHS_IN_YEAR);
            case SEMI_MONTHLY:
                return amount.multiply(SEMI_MONTHS_IN_YEAR);
            default:
                throw new RuntimeException("Unsupported Salary Schedule: " + salary.getType());
        }
    }

    /**
     * Sorts a list of Salaries by effective date. TAKE NOTE: This method
     * modifies the order of Salaries in the list parameter.
     *
     */
    public static List<Salary> sortByEffectiveDate(List<Salary> list) {
        logger.info("Sorting Salaries by EffectiveDate");
        Collections.sort(list, new SalaryBasicComparator());
        return list;
    }

    /**
     * Given a Salary, calculate what will be the thirteenth month pay.
     *
     * The thirteenth month is calculated based on the Salary's effectiveDate.
     * For example, if the Salary's effectiveDate is June of the current year,
     * then the thirteenth month pay will be pro-rated starting Jun until Dec of
     * the current year.
     *
     * Salary ScheduleType supported: - MONTHLY - SEMI_MONTHLY
     */
    public static BigDecimal calculateThirteenthMonth(Salary salary, int year) {

        BigDecimal monthlySalary = null;
        switch (salary.getType()) {
            case MONTHLY:

                monthlySalary = salary.getAmount();


                break;
            case SEMI_MONTHLY:
                monthlySalary = salary.getAmount().add(salary.getAmount());
                break;
            default:
                throw new RuntimeException("Unsupported Salary Schedule: " + salary.getType());
        }
        
        //Get the month when the salary will be effective
        Calendar cal = Calendar.getInstance();
        cal.setTime(salary.getEffectiveDate());
        int month = cal.get(Calendar.MONTH);

        //Get the remainder of the month when the 13th needs to be applied
        BigDecimal range = new BigDecimal(MONTHS_IN_YEAR.intValue() - month);

        monthlySalary = monthlySalary.setScale(5, BigDecimal.ROUND_UP);
        //Get the monthly rate for the 13th month pay
        BigDecimal monthly = monthlySalary.divide(MONTHS_IN_YEAR, BigDecimal.ROUND_UP);
        
        return monthly.multiply(range);
    }

    /**
     * A facade method for calculating the thirteenth month pay. See
     * @calculateThirteenthMonth for details.
     *
     * @param amount - Salary amount
     * @param type - Salary type
     * @param salaryEffectiveDate - Effective date of the salary (dd/MM/yyyy)
     * @param year - The year for the thirteenth month pay.
     * @return
     */
    public static BigDecimal calculateThirteenthMonth(double amount, ScheduleType type,
            String salaryEffectiveDate, int year) {

        Salary sal = new Salary(String.valueOf(amount), type, salaryEffectiveDate);
        return SalarySv.calculateThirteenthMonth(sal, year);
    }
}
