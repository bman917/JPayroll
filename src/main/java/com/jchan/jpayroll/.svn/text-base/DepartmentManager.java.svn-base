package com.jchan.jpayroll;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.hibernate.Session;

import com.jchan.jpayroll.model.Department;

public class DepartmentManager
{
	public static void main(String[] args) throws Exception
	{
		Jpersonic.startHypersonicDB("target/data", "JPayrollDB");
		DepartmentManager mgr = new DepartmentManager();

		if (args[0].equals("store"))
		{
			mgr.createDepartment("MRC", "Marikina Rubber Corp.");
		}
		
		Jpersonic.shutdownHypersonicDB("target/data", "JPayrollDB");

	}

	private void createDepartment(String name, String desc)
	{
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Department dep = new Department();
		dep.setName(name);
		dep.setDescription(desc);

		session.save(dep);
		session.disconnect();
		session.getTransaction().commit();
	}
	
	private Department getDepartment(String name)
	{
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		
		return null;
	}

}
