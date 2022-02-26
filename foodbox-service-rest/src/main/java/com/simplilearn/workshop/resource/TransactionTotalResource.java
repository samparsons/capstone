package com.simplilearn.workshop.resource;

import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.simplilearn.workshop.exception.TransactionTotalNotFoundException;
import com.simplilearn.workshop.model.TransactionTotal;
import com.simplilearn.workshop.repository.TransactionTotalRepository;

@CrossOrigin(allowedHeaders="*",originPatterns="*")
@RestController
public class TransactionTotalResource {
	
	@Autowired
	private TransactionTotalRepository transactionTotalRepository;
	
	
	@GetMapping(path="/transactionTotal")
	public List<TransactionTotal> getTransactionTotals() {
		return transactionTotalRepository.findAll() ;
	}
	
	@GetMapping(path="/transactionTotal/user/{theId}")
	public List<TransactionTotal> getTransactionTotalByUserId(@PathVariable Integer theId) {
		List<TransactionTotal> TransactionTotal = transactionTotalRepository.findByuserid(theId); 
		return TransactionTotal;
	}
	
	@GetMapping(path="/transactionTotal/{theId}")
	public List<TransactionTotal> getTransactionTotalById(@PathVariable Integer theId) {
		List<TransactionTotal> TransactionTotal = transactionTotalRepository.findByuserid(theId); 
		return TransactionTotal;
	}
	
	@PostMapping(path = "/transactionTotal")
	public TransactionTotal createProduct(@RequestBody TransactionTotal theTransactionTotal) {
		TransactionTotal savedTransactionTotal = transactionTotalRepository.save(theTransactionTotal);
		System.out.println("the transactionTotal" + theTransactionTotal.toString());
		
		System.out.println("the savedTransactionTotal" + savedTransactionTotal.toString());
		URI location = ServletUriComponentsBuilder
				 .fromCurrentRequest()
				 .path("/{theId}")
				 .buildAndExpand(savedTransactionTotal.getId())
				 .toUri();
		return savedTransactionTotal;
	}
	
	@PutMapping(path="/transactionTotal/{theId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateProduct(@PathVariable Integer theId, @RequestBody TransactionTotal theTransactionTotal) {
		try {
			//System.out.println("ID PASSED: " + theId);
			//System.out.println("USER PASSED: " + theTransactionTotal);
			TransactionTotal savedTransactionTotal = transactionTotalRepository.findById(theId).get();
			//System.out.println("FOUND USER: " + savedTransactionTotal);
			savedTransactionTotal.setPaymentmethod(theTransactionTotal.getPaymentmethod());
			savedTransactionTotal.setUserid(theTransactionTotal.getUserid());
			savedTransactionTotal.setTotalprice(theTransactionTotal.getTotalprice());
			savedTransactionTotal.setTransactiondate(theTransactionTotal.getTransactiondate());
			savedTransactionTotal.setDeliverydate(theTransactionTotal.getDeliverydate());
			savedTransactionTotal.setDeliverytime(theTransactionTotal.getDeliverytime());
			transactionTotalRepository.save(savedTransactionTotal);
		} catch (TransactionTotalNotFoundException e) {
			throw new TransactionTotalNotFoundException("id -" + theId);
		}  catch (NoSuchElementException e) {
			throw new TransactionTotalNotFoundException("id - " + theId);
		}
	}
	
	@DeleteMapping(path="/transactionTotal/{theId}")
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void deleteProduct(@PathVariable Integer theId) {
		try {
		TransactionTotal theTransactionTotal = transactionTotalRepository.findById(theId).get();
		} catch (TransactionTotalNotFoundException e) {
			throw new TransactionTotalNotFoundException("id -" + theId); 
		}  catch (NoSuchElementException e) {
			throw new TransactionTotalNotFoundException("id - " + theId);
		}
		transactionTotalRepository.deleteById(theId);
	}

}
