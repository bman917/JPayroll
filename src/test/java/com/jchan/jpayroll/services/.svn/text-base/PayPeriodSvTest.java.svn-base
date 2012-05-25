package com.jchan.jpayroll.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.util.HashSet;
import java.util.Set;

import org.junit.Test;

import com.jchan.jpayroll.common.Day;
import com.jchan.jpayroll.common.ScheduleType;
import com.jchan.jpayroll.exceptions.SimplifyScheduleDataException;
import com.jchan.jpayroll.model.PaySchedule;
import com.jchan.jpayroll.model.PayScheduleFactory;
import com.jchan.jpayroll.model.WeeklyPaySchedule;

public class PayPeriodSvTest
{
	PayPeriodSv service = PayPeriodSv.getInstance();
	
	/**
	 * Test for
	 * http://jpayrolldev.blogspot.com/2011/01/use-case-user-inputs-maximum-pay.html
	 */
	@Test
	public void testSimplifyData()
	{
		Set<Day> days = new HashSet<Day>();
		days.add(Day.MONDAY);
		days.add(Day.TUESDAY);
		days.add(Day.WEDNESDAY);
		days.add(Day.THRUSDAY);
		days.add(Day.FRIDAY);
		days.add(Day.SATURDAY);
		days.add(Day.SUNDAY);
		
		try
		{
			WeeklyPaySchedule paySchedule = PayScheduleFactory.createWeeklyPaySchedule(days);
			fail("Creating a weekly schedule with pay days Mon-Sunday should result in a SimplifyScheduleDataException");
		}
		catch (SimplifyScheduleDataException appException)
		{
			PaySchedule alternativePaySched = appException.getAltenrative();
			assertEquals("Incorrect alternative payschedule.", ScheduleType.DAILY, alternativePaySched.getType());
		}
		catch (Exception ex)
		{
			fail("Creating a weekly schedule with pay days Mon-Sunday should result in a SimplifyScheduleDataException");
		}
	}

	/**
	 * Assign a PaySchedule to a department then then retrieve 
	 * the department and check that the PaySchedule has been saved.
	 */
	@Test
	public void testAssignDepartmentPaySchedule() 
	{
		String departmentID = "Management";
		
		PaySchedule paySchedule = PayScheduleFactory.createPaySchedule(ScheduleType.DAILY);
		service.assignDepartmentPaySchedule(departmentID, paySchedule);
		
		PaySchedule retrievedPaySched = service.getCurrentPaySchedule(PayPeriodSv.Context.Department, departmentID);
		assertEquals("Retrieved PaySchedule is not the same as the PaySchedule that was set.", paySchedule, retrievedPaySched);
	}

	@Test
	public void testAssignDivisionPaySchedule() 
	{
		String divisionID = "Team A";
		
		PaySchedule paySchedule = PayScheduleFactory.createPaySchedule(ScheduleType.END_OF_WEEK);
		service.assignDivisionPaySchedule(divisionID, paySchedule);
		
		PaySchedule retrievedPaySched = service.getCurrentPaySchedule(PayPeriodSv.Context.Division, divisionID);
		assertEquals("Retrieved PaySchedule is not the same as the PaySchedule that was set.", paySchedule, retrievedPaySched);
	}

	@Test
	public void testAssignEmployeePaySchedule() 
	{
		String employeeID = "0001";
		
		PaySchedule paySchedule = PayScheduleFactory.createPaySchedule(ScheduleType.END_OF_WEEK);
		service.assignEmployeePaySchedule(employeeID, paySchedule);
		
		PaySchedule retrievedPaySched = service.getCurrentPaySchedule(PayPeriodSv.Context.Employee, employeeID);
		assertEquals("Retrieved PaySchedule is not the same as the PaySchedule that was set.", paySchedule, retrievedPaySched);
		fail("Not yet implemented");
	}

}
