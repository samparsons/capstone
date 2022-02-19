package com.simplilearn.workshop.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer Id;
	private String name;
	private String address;
	private String username;
	private String password;
	private Boolean adminstatus;
	
	public User() {
		super();
	}

	public User(String name, String address, String username, String password, Boolean adminstatus) {
		super();
		this.name = name;
		this.address = address;
		this.username = username;
		this.password = password;
		this.adminstatus = adminstatus;
	}
	
	

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getAdminstatus() {
		return adminstatus;
	}

	public void setAdminstatus(Boolean adminstatus) {
		this.adminstatus = adminstatus;
	}

	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "User [Id=" + Id + ", name=" + name + ", address=" + address + ", adminstatus=" + adminstatus + "]";
	}
}
