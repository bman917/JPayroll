package com.jchan.jpayroll.model;

import java.util.Set;

import com.jchan.jpayroll.common.ScheduleType;

public class SpecificDatePaySchedule extends PaySchedule
{
	Set<Integer> dates = null;
	
	public SpecificDatePaySchedule(Set<Integer> dates)
	{
		super(ScheduleType.SPECIFIC_DATE);
		this.dates = dates;
		
		for (int i : dates)
		{
			if (i > 31)
			{
				throw new RuntimeException("BUG!!! There's no date > than 31");
			}
		}
	}
	
	public Set<Integer> getDates()
	{
		return dates;
	}
}
