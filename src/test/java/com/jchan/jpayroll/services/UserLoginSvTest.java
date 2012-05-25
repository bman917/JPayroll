package com.jchan.jpayroll.services;

import org.junit.Test;

import com.jchan.jpayroll.common.LoginStatus;
import com.jchan.jpayroll.model.HistoryEntry;

import static org.junit.Assert.*;

public class UserLoginSvTest
{
	UserLoginSv sv = UserLoginSv.getInstance();
	HistorySv historySv = HistorySv.getInstance();
	
	public void setUp()
	{

	}
	
	/**
	 * Test that:
	 * 1. There is an account from admin1 to admin7, and each can login
	 * 2. A history is created whenever an admin logs-in.
	 */
	@Test
	public void testLogin()
	{
		sv = UserLoginSv.getInstance();
		sv.purgeAdminUsers();
		sv.createAdminUsers();
		
		login("admin1");
		login("admin2");
		login("admin3");
		login("admin4");
		login("admin5");
		login("admin6");
		login("admin7");
	}
	
	/**
	 * Test that user login is successful and that a history is created
	 * @param user
	 */
	private void login(String user)
	{
		LoginStatus isLoginSuccess = sv.authAdmin(user, "changeit");
		assertTrue(user + " login failed", isLoginSuccess.equals(LoginStatus.SUCCESS));
		
		HistoryEntry entry = historySv.getLastEntry();
		assertNotNull("History Entry should be created when an Admin logs in", entry);
		assertEquals("Incorrect history entry username for user " + user, user, entry.getUserName());
		assertTrue("Incorrect history entry description for user " + user, entry.getDescription().contains("Login"));
	}
}
