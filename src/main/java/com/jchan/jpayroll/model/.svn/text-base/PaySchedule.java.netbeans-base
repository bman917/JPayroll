package com.jchan.jpayroll.model;

import java.util.HashMap;
import java.util.Map;

import com.jchan.jpayroll.common.ScheduleType;

public class PaySchedule
{
	ScheduleType scheduleType;
	Map<String, String> params = new HashMap<String,String>();
	
	protected PaySchedule(ScheduleType scheduleType)
	{
		this.scheduleType = scheduleType;
	}
	
	public ScheduleType getType()
	{
		return scheduleType;
	}
	
	public void add(String name, String value)
	{
		params.put(name,value);
	}
	
	public String get(String name)
	{
		return params.get(name);
	}
	
	@Override
	public String toString()
	{
		String val = this.scheduleType.toString();
		
		if (params.isEmpty() == false)
		{
			val += "-" + params;
		}
		return val;
	}
	
	@Override
	public boolean equals(Object o)
	{
		if (o instanceof PaySchedule)
		{
			PaySchedule ps = (PaySchedule)o;
			return this.toString().equals(ps.toString());
		}
		else
		{
			return false;
		}
	}
}
