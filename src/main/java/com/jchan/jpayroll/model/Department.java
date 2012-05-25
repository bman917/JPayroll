package com.jchan.jpayroll.model;

import java.util.Date;

public class Department
{
	private Long id;

	private String name;
	private String description;

	public Department()
	{
	}

	public Long getId()
	{
		return id;
	}

	private void setId(Long id)
	{
		this.id = id;
	}

	public String getDescription()
	{
		return description;
	}

	public void setDescription(String description)
	{
		this.description = description;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}
}