/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jchan.jpayroll.model;

import com.jchan.jpayroll.common.ScheduleType;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;

/**
 * A salary object represents the Salary of an Employee.
 * 
 * The salary with the most recent 'effectiveDate' will be the employee's
 * current salary. Other salaries related to the employee will be the
 * historical record of the employee's salary.
 * 
 * @author Mr Jacky
 */
public class Salary {
    
    BigDecimal amount;
    ScheduleType type;
    Date effectiveDate;
    
    public Salary(BigDecimal amount, ScheduleType type) {
        this.amount = amount;
        this.type = type;
        effectiveDate = Calendar.getInstance().getTime();
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
