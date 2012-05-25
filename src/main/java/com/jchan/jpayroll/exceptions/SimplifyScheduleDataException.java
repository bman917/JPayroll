package com.jchan.jpayroll.exceptions;

import com.jchan.jpayroll.model.PaySchedule;

public class SimplifyScheduleDataException extends Exception
{
	PaySchedule alternative;
	
	public SimplifyScheduleDataException (PaySchedule alt)
	{
		alternative = alt;
	}
	
	public PaySchedule getAltenrative()
	{
		return alternative;
	}

}
