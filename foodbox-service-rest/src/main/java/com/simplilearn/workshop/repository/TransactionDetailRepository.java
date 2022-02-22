package com.simplilearn.workshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simplilearn.workshop.model.TransactionDetail;

public interface TransactionDetailRepository extends JpaRepository<TransactionDetail,Integer>{
	List<TransactionDetail> findBytransactionid(Integer transactionId);
}
