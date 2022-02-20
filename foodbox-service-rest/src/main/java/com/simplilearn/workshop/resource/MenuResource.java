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

import com.simplilearn.workshop.exception.MenuNotFoundException;
import com.simplilearn.workshop.model.Menu;
import com.simplilearn.workshop.repository.MenuRepository;

@CrossOrigin(allowedHeaders="*",originPatterns="*")
@RestController
public class MenuResource {
	@Autowired
	private MenuRepository menuRepository;
	
	@GetMapping(path="/")
	public String welcome() {
		return "please choose an API route to call";
	}
	
	@GetMapping(path="/menu")
	public List<Menu> getGroceries() {
		return menuRepository.findAll();
	}
	
	@GetMapping(path="/menu/{theId}")
	public Menu getMenuById(Integer theId) {
		Menu menu = menuRepository.findById(theId).get(); 
		return menu;
	} 
	
	@PostMapping(path = "/menu")
	public ResponseEntity<Menu> createProduct(@RequestBody Menu theMenu) {
		Menu savedMenu = menuRepository.save(theMenu);
		URI location = ServletUriComponentsBuilder
				 .fromCurrentRequest()
				 .path("/{theId}")
				 .buildAndExpand(savedMenu.getId())
				 .toUri();
		return ResponseEntity.created(location).build();
	}
	
	@PutMapping(path="/menu/{theId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateProduct(@PathVariable Integer theId, @RequestBody Menu theMenu) {
		try {
			Menu savedMenu = menuRepository.findById(theId).get();
			savedMenu.setName(theMenu.getName());
			savedMenu.setDescription(theMenu.getDescription());
			savedMenu.setPrice(theMenu.getPrice());
			menuRepository.save(savedMenu);
		} catch (MenuNotFoundException e) {
			throw new MenuNotFoundException("id - " + theId);
		}  catch (NoSuchElementException e) {
			throw new MenuNotFoundException("id - " + theId);
		}
	}
	
	@DeleteMapping(path="/menu/{theId}")
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void deleteProduct(@PathVariable Integer theId) {
		try {
		Menu theMenu = menuRepository.findById(theId).get();
		} catch (MenuNotFoundException e) {
			throw new MenuNotFoundException("id -" + theId);
		}  catch (NoSuchElementException e) {
			throw new MenuNotFoundException("id - " + theId);
		}
		menuRepository.deleteById(theId);
	}

}
