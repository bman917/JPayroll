package com.jchan.jpayroll.services;

import static org.junit.Assert.fail;

import org.junit.Test;

import com.jchan.jpayroll.common.ScheduleType;
import com.jchan.jpayroll.model.PaySchedule;
import com.jchan.jpayroll.model.PayScheduleFactory;

/**
 * Related to "PS.03: User Inputs Maximum Pay Schedule Data" <br/>
 * https://github.com/bman917/JPayroll/wiki/Pay-Period-Use-Cases
 * <p/>
 * 
 * Apparently, I decided to implement offering an alternative schedules 
 * as an Exception. That is, if a user creates a PaySchedule that can be 
 * simplified, an exception will be thrown and the exception contains the 
 * alternative 'simplified' PaySchedule.
 * <p/>
 * 
 * Of course the PaySchedule create validation is only possible if the 
 * PayScheduleFactory is used. And so, PaySchedules has been coded to have 
 * 'protected' constructors. The idea is the only way to create them is 
 * through the factory class.
 */
public class PayScheduleCreateTest
{
	@Test
	public void testWeeklyPayScheduleCreate()
	{
		try
		{
			PaySchedule w = PayScheduleFactory.createPaySchedule(ScheduleType.DAY_OF_WEEK);
			fail("Weekly or Day-Of-Week PaySchedule should only be created through a specifc PayScheduleFactory method so that validation can be performed.");
		}
		catch(Exception e)
		{
			//Pass
			System.out.println("testWeeklyPayScheduleCreate has passed unit test. " +
					"\n-->Expected Exception: " + e);
		}
	}

}
