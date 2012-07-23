/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jchan.jpayroll.comparators;

import com.jchan.jpayroll.model.Salary;
import java.util.Comparator;

/**
 *
 * @author Mr Jacky
 */
public class SalaryBasicComparator implements Comparator<Salary>{

    public int compare(Salary o1, Salary o2) {
        return o1.getEffectiveDate().compareTo(o2.getEffectiveDate());
    }
}
