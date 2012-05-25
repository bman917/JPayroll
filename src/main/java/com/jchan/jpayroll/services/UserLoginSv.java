package com.jchan.jpayroll.services;

import org.hibernate.Session;

import com.jchan.jpayroll.HibernateUtil;
import com.jchan.jpayroll.common.LoginStatus;
import com.jchan.jpayroll.model.AdminUser;

public class UserLoginSv
{
	private static UserLoginSv INSTANCE = new UserLoginSv();
	
	public static UserLoginSv getInstance()
	{
		return INSTANCE;
	}
	
	/**
	 * Returns true if the supplied username and password
	 * matches and refers to an Admin account.
	 * 
	 * @param username
	 * @param password
	 */
	public LoginStatus authAdmin(String username, String password)
	{
		AdminUser admin = getAdminUser(username);
		
		HistorySv.getInstance().create(username, "Login");
		
		if (admin != null)
		{
			if (admin.getPassword().equals(password))
			{
				return LoginStatus.SUCCESS;
			}
			else
			{
				return LoginStatus.INCORRECT;
			}
		}
		else
		{
			return LoginStatus.NOUSER;
		}
	}
	
	/**
	 * Delete all admin accounts
	 */
	public void purgeAdminUsers()
	{
		
	}
	
	/**
	 * Create default admin accounts
	 */
	public void createAdminUsers()
	{
		String pass = "changeit";
		
		createAdminUser("admin1", pass);
		createAdminUser("admin2", pass);
		createAdminUser("admin3", pass);
		createAdminUser("admin4", pass);
		createAdminUser("admin5", pass);
		createAdminUser("admin6", pass);
		createAdminUser("admin7", pass);
	}
	
	public static AdminUser getAdminUser(String name)
	{
		AdminUser u = new AdminUser();
		u.setName(name);
		
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		
		return (AdminUser) session.get(AdminUser.class, name);
	}
	
	public static void createAdminUser(String name, String password)
	{
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		AdminUser user = new AdminUser();
		user.setName(name);
		user.setPassword(password);

		session.save(user);
		session.disconnect();
		session.getTransaction().commit();
	}
}
