/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jchan.jpayroll.model;

import java.math.BigDecimal;
import java.util.List;

/**
 *
 * @author Mr Jacky
 */
public class Pay {
    
    Employee employee;
    Salary salary;
    
    BigDecimal netAmount;
    BigDecimal incomeTax;
    
    List<BigDecimal> nonTaxableDeductions;
    List<BigDecimal> taxableDeductions;
}
