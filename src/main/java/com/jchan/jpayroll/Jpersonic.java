package com.jchan.jpayroll;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Mr Jacky's wrapper for starting an in-process hypersonic database
 * 
 * @author Mr Jacky
 * 
 */
public class Jpersonic
{
	public static void startHypersonicDB(String dataDir, String databaseName)
		throws ClassNotFoundException, SQLException
	{
		createHypersonicConnection(dataDir, databaseName);
	}

	public static void shutdownHypersonicDB(String dataDir, String databaseName)
			throws ClassNotFoundException, SQLException
	{
		createHypersonicConnection(dataDir, databaseName).createStatement()
				.execute("SHUTDOWN");
	}

	public static Connection createHypersonicConnection(String dataDir,
			String databaseName) throws ClassNotFoundException, SQLException
	{
		Class.forName("org.hsqldb.jdbcDriver");

		String conURL = "jdbc:hsqldb:file:" + dataDir + "/" + databaseName;
		
		System.out.println("Creating connection for: " + conURL);
		
		return DriverManager.getConnection(conURL, "SA", "");
	}

}
