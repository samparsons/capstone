package com.simplilearn.workshop.resource;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;

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

import com.simplilearn.workshop.exception.MenuNotFoundException;
import com.simplilearn.workshop.exception.UserNotFoundException;
import com.simplilearn.workshop.model.Menu;
import com.simplilearn.workshop.model.User;
import com.simplilearn.workshop.repository.UserRepository;

@CrossOrigin(allowedHeaders="*",originPatterns="*")
@RestController
public class UserResource {
	
	@Autowired
	private UserRepository userRepository;
	
	
	@GetMapping(path="/user")
	public List<User> getUsers() {
		return userRepository.findAll();
	}
	
	@GetMapping(path="/user/login/{username}/{password}")
	public User getUserAuth(@PathVariable String username,@PathVariable String password) {
		if(username==null||password==null) {
			throw new UserNotFoundException("username or password was null <br>username:" +username+"<br>password: "+password);
		}
		User user = userRepository.findFirstDistinctByUsernameAndPassword(username, password);
		if (user == null) {
			throw new UserNotFoundException("username -" +username);
		}
		return user;
	}
	
	@GetMapping(path="/user/{theId}")
	public User getUserById(@PathVariable Integer theId) {
		User User = userRepository.findById(theId).get(); 
		return User;
	} 
	
	@PostMapping(path = "/user")
	public User createUser(@RequestBody User theUser) {
		User savedUser = userRepository.save(theUser);
		savedUser.setAdminstatus(theUser.getAdminstatus());
		if(savedUser.getAdminstatus()==null) {
			savedUser.setAdminstatus(false);
		}
		URI location = ServletUriComponentsBuilder
				 .fromCurrentRequest()
				 .path("/{theId}")
				 .buildAndExpand(savedUser.getId())
				 .toUri();
		return savedUser;
	}
	
	@PutMapping(path="/user/{theId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateUser(@PathVariable Integer theId, @RequestBody User theUser) {
		try {
			//System.out.println("ID PASSED: " + theId);
			//System.out.println("USER PASSED: " + theUser);
			User savedUser = userRepository.findById(theId).get();
			//System.out.println("FOUND USER: " + savedUser);
			savedUser.setName(theUser.getName());
			savedUser.setAddress(theUser.getAddress());
			savedUser.setAdminstatus(theUser.getAdminstatus());
			if(savedUser.getAdminstatus()==null) {
				savedUser.setAdminstatus(false);
			}
			userRepository.save(savedUser);
		} catch (UserNotFoundException e) {
			throw new UserNotFoundException("id -" + theId);
		}  catch (NoSuchElementException e) {
			throw new UserNotFoundException("id - " + theId);
		}
	}
	
	@DeleteMapping(path="/user/{theId}")
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void deleteUser(@PathVariable Integer theId) {
		try {
		User theUser = userRepository.findById(theId).get();
		} catch (UserNotFoundException e) {
			throw new UserNotFoundException("id -" + theId); 
		}  catch (NoSuchElementException e) {
			throw new UserNotFoundException("id - " + theId);
		}
		userRepository.deleteById(theId);
	}

}
