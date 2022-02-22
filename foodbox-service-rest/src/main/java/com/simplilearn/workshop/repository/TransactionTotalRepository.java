package com.simplilearn.workshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simplilearn.workshop.model.TransactionTotal;

public interface TransactionTotalRepository extends JpaRepository<TransactionTotal,Integer>{
	List<TransactionTotal> findByuserid(Integer userid);
}
