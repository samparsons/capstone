package com.simplilearn.workshop.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class TransactionTotalNotFoundException extends RuntimeException {
	
	public TransactionTotalNotFoundException(String description) {
		super(description);
	}

}
