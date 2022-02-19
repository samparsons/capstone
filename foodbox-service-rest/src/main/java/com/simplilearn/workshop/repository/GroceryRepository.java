package com.simplilearn.workshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simplilearn.workshop.model.Menu;

public interface GroceryRepository extends JpaRepository<Menu,Integer>{

}
