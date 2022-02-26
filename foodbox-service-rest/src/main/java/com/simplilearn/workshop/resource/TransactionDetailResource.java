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

import com.simplilearn.workshop.exception.TransactionDetailNotFoundException;
import com.simplilearn.workshop.model.TransactionDetail;
import com.simplilearn.workshop.model.TransactionTotal;
import com.simplilearn.workshop.repository.TransactionDetailRepository;

@CrossOrigin(allowedHeaders="*",originPatterns="*")
@RestController
public class TransactionDetailResource {
	
	@Autowired
	private TransactionDetailRepository transactionDetailRepository;
	
	
	@GetMapping(path="/transactionDetail")
	public List<TransactionDetail> getTransactionDetails() {
		return transactionDetailRepository.findAll();
	}
	
	@GetMapping(path="/transactionTotal/trans/{theId}")
	public List<TransactionDetail> getTransactionDetailByTransactionId(@PathVariable Integer transaction_id) {
		List<TransactionDetail> TransactionTotal = transactionDetailRepository.findBytransactionid(transaction_id); 
		return TransactionTotal;
	}
	
	@GetMapping(path="/transactionDetail/{theId}")
	public TransactionDetail getTransactionDetailById(@PathVariable Integer theId) {
		TransactionDetail TransactionDetail = transactionDetailRepository.findById(theId).get(); 
		return TransactionDetail;
	} 
	
	@PostMapping(path = "/transactionDetail")
	public TransactionDetail createProduct(@RequestBody TransactionDetail theTransactionDetail) {
		TransactionDetail savedTransactionDetail = transactionDetailRepository.save(theTransactionDetail);
		
		URI location = ServletUriComponentsBuilder
				 .fromCurrentRequest()
				 .path("/{theId}")
				 .buildAndExpand(savedTransactionDetail.getId())
				 .toUri();
		return savedTransactionDetail;
	}
	
	@PutMapping(path="/transactionDetail/{theId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateProduct(@PathVariable Integer theId, @RequestBody TransactionDetail theTransactionDetail) {
		try {
			//System.out.println("ID PASSED: " + theId);
			//System.out.println("USER PASSED: " + theTransactionDetail);
			TransactionDetail savedTransactionDetail = transactionDetailRepository.findById(theId).get();
			//System.out.println("FOUND USER: " + savedTransactionDetail);
			savedTransactionDetail.setTransactionid(theTransactionDetail.getTransactionid());
			savedTransactionDetail.setUserid(theTransactionDetail.getUserid());
			savedTransactionDetail.setMenuid(theTransactionDetail.getMenuid());
			savedTransactionDetail.setQuantity(theTransactionDetail.getQuantity());
			
			transactionDetailRepository.save(savedTransactionDetail);
		} catch (TransactionDetailNotFoundException e) {
			throw new TransactionDetailNotFoundException("id -" + theId);
		}  catch (NoSuchElementException e) {
			throw new TransactionDetailNotFoundException("id - " + theId);
		}
	}
	
	@DeleteMapping(path="/transactionDetail/{theId}")
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void deleteProduct(@PathVariable Integer theId) {
		try {
		TransactionDetail theTransactionDetail = transactionDetailRepository.findById(theId).get();
		} catch (TransactionDetailNotFoundException e) {
			throw new TransactionDetailNotFoundException("id -" + theId); 
		}  catch (NoSuchElementException e) {
			throw new TransactionDetailNotFoundException("id - " + theId);
		}
		transactionDetailRepository.deleteById(theId);
	}

}
