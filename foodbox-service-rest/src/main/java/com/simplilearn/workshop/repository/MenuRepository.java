package com.simplilearn.workshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simplilearn.workshop.model.Menu;

public interface MenuRepository extends JpaRepository<Menu,Integer>{
//findAll set
	List<Menu> findAllByOrderByName();
	List<Menu> findAllByOrderByNameDesc();
	List<Menu> findAllByOrderByPrice();
	List<Menu> findAllByOrderByPriceDesc();
	
//findActive set
	//active false
	List<Menu> findByActiveFalse();
	List<Menu> findByActiveFalseOrderByName();
	List<Menu> findByActiveFalseOrderByNameDesc();
	List<Menu> findByActiveFalseOrderByPrice();
	List<Menu> findByActiveFalseOrderByPriceDesc();
	// active true
	List<Menu> findByActiveTrue();
	List<Menu> findByActiveTrueOrderByName();
	List<Menu> findByActiveTrueOrderByNameDesc();
	List<Menu> findByActiveTrueOrderByPrice();
	List<Menu> findByActiveTrueOrderByPriceDesc();
	
// findActive and Category
	//active false
	List<Menu> findByCategoryAndActiveFalse(String category);
	List<Menu> findByCategoryAndActiveFalseOrderByName(String category);
	List<Menu> findByCategoryAndActiveFalseOrderByNameDesc(String category);
	List<Menu> findByCategoryAndActiveFalseOrderByPrice(String category);
	List<Menu> findByCategoryAndActiveFalseOrderByPriceDesc(String category);
	// active true
	List<Menu> findByCategoryAndActiveTrue(String category);
	List<Menu> findByCategoryAndActiveTrueOrderByName(String category);
	List<Menu> findByCategoryAndActiveTrueOrderByNameDesc(String category);
	List<Menu> findByCategoryAndActiveTrueOrderByPrice(String category);
	List<Menu> findByCategoryAndActiveTrueOrderByPriceDesc(String category);	
}
