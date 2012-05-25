package com.jchan.jpayroll.model;

import java.util.Set;

import com.jchan.jpayroll.common.Day;
import com.jchan.jpayroll.common.ScheduleType;
import com.jchan.jpayroll.exceptions.SimplifyScheduleDataException;

/**
 * Factory for creating every kind of PaySchedule. PaySchedules should only be
 * created through this factory
 * 
 * @author Mr Jacky
 * 
 */
public class PayScheduleFactory
{
	/**
	 * Factory method for creating WeeklyPaySchedules
	 * 
	 * @param days
	 * @return
	 * @throws SimplifyScheduleDataException
	 */
	public static WeeklyPaySchedule createWeeklyPaySchedule(Set<Day> days)
			throws SimplifyScheduleDataException
	{
		if (days.size() == 7)
		{
			SimplifyScheduleDataException ex = new SimplifyScheduleDataException(
					createPaySchedule(ScheduleType.DAILY));
			throw ex;
		} else
		{
			WeeklyPaySchedule ps = new WeeklyPaySchedule(days);
			return ps;
		}
	}

	public static PaySchedule createPaySchedule(ScheduleType type)
	{
		if (ScheduleType.DAY_OF_WEEK.equals(type))
		{
			throw new IllegalArgumentException("BUG DETECTED: You are only allowed to create a WeeklyPaySchedule through a specialized factory method so that validation can be perfomred.");
		}
		
		return new PaySchedule(type);
	}
}
