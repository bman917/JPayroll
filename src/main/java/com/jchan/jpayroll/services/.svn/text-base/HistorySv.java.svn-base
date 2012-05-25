package com.jchan.jpayroll.services;

import org.hibernate.Session;

import com.jchan.jpayroll.HibernateUtil;
import com.jchan.jpayroll.model.HistoryEntry;

public class HistorySv
{
	private static HistorySv INSTANCE = new HistorySv();
	private HistoryEntry lastEntry = null;
	
	public static HistorySv getInstance()
	{
		return INSTANCE;
	}
	
	/**
	 * Delete all history in the database
	 */
	public void purgeAll()
	{
		
	}
	
	/**
	 * The the last recorded HistoryEntry
	 * @return HistoryEntry
	 */
	public HistoryEntry getLastEntry()
	{
		return lastEntry;
	}
	
	public HistoryEntry create(String name, String desc)
	{
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		HistoryEntry history = new HistoryEntry();
		history.setUserName(name);
		history.setDescription(desc);

		session.save(history);
		session.disconnect();
		session.getTransaction().commit();
		
		lastEntry = history;
		return history;
	}
}
