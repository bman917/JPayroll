package com.jchan.jpayroll.model;

public class HistoryEntry
{
	private Long id;
	
	public Long getId()
	{
		return id;
	}
	public void setId(Long id)
	{
		this.id = id;
	}
	private String description;
	private String userName;
	
	public String getDescription()
	{
		return description;
	}
	public void setDescription(String description)
	{
		this.description = description;
	}
	public String getUserName()
	{
		return userName;
	}
	public void setUserName(String name)
	{
		this.userName = name;
	}
}
