package com.simplilearn.workshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simplilearn.workshop.model.User;

public interface UserRepository extends JpaRepository<User,Integer>{
	User findFirstDistinctByUsernameAndPassword(String username,String password);
}
