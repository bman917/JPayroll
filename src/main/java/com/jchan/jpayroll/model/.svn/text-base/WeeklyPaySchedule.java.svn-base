package com.jchan.jpayroll.model;

import java.util.Set;

import com.jchan.jpayroll.common.Day;
import com.jchan.jpayroll.common.ScheduleType;

public class WeeklyPaySchedule extends PaySchedule
{
	Set<Day> days = null;
	
	/**
	 * WARNING: WeeklyPaySchedule should only be created through the PayScheduleFactory.
	 * 
	 * @param day - List of day's of the week (where in the employee is expected to be paid).
	 */
	protected WeeklyPaySchedule(Set<Day> day)
	{
		super(ScheduleType.DAY_OF_WEEK);
		this.days = day;
	}
	
	public Set<Day> getDays()
	{
		return days;
	}
}
