/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jchan.jpayroll.model;

import com.jchan.jpayroll.common.ScheduleType;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * A salary object represents the Salaryo f an Employee.
 *
 * The salary with the most recent 'effectiveDate' will be the employee's
 * current salary. Other salaries related to the employee will be the historical
 * record of the employee's salary.
 *
 * @author Mr Jacky
 */
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    BigDecimal amount;
    ScheduleType type;
    Date effectiveDate;
    
    public Salary(int amount, ScheduleType type) {
        init(new BigDecimal(amount), type, null);
    }

    public Salary(String amount, ScheduleType type) {
        init(new BigDecimal(amount), type, null);
    }

    public Salary(BigDecimal amount, ScheduleType type) {
        init(amount, type, null);
    }

    /**
     *
     * @param amount
     * @param type
     * @param date dd/MM/yyyy
     */
    public Salary(String amount, ScheduleType type, String date) {

        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date d;

        try {
            d = sdf.parse(date);
        } catch (ParseException ex) {
            throw new RuntimeException(ex);
        }

        init(new BigDecimal(amount), type, d);
    }

    private void init(BigDecimal amount, ScheduleType type, Date date) {
        this.amount = amount;
        this.type = type;
        if (date == null) {
            effectiveDate = Calendar.getInstance().getTime();
        } else {
            effectiveDate = date;
        }
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Date getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(Date effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public ScheduleType getType() {
        return type;
    }

    public void setType(ScheduleType type) {
        this.type = type;
    }
}
