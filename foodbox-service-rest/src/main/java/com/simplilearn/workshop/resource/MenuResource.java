package com.simplilearn.workshop.resource;

import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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
	
	@GetMapping(path={	"/menu/all",
						"/menu/all/{orderByField}",
						"/menu/all/{orderByField}/{sortDesc}"})
	public List<Menu> getAllMenus(	@PathVariable(required = false) String orderByField, 
									@PathVariable(required = false) Boolean sortDesc) {
		if(orderByField!=null) {
			if(orderByField.equals("name")&&sortDesc==null) {
				return menuRepository.findAllByOrderByName();
			}else if(orderByField.equals("name")&&!sortDesc) {
				return menuRepository.findAllByOrderByName();
			}else if(orderByField.equals("name")&&sortDesc) {
				return menuRepository.findAllByOrderByNameDesc();
			}else if(orderByField.equals("price")&&sortDesc==null) {
				return menuRepository.findAllByOrderByPrice();
			}else if(orderByField.equals("price")&&!sortDesc) {
				return menuRepository.findAllByOrderByPrice();
			}else if(orderByField.equals("price")&&sortDesc) {
				return menuRepository.findAllByOrderByPriceDesc();
			}else {
				return menuRepository.findAll();
			}
		} else {
			return menuRepository.findAll();
		}
	}
	
	@GetMapping(path={	"/menu/np/{active}",
						"/menu/np/{active}/{orderByField}",
						"/menu/np/{active}/{orderByField}/{sortDesc}"})
	public List<Menu> getActiveMenus(	@PathVariable Boolean active, 
										@PathVariable(required = false) String orderByField, 
										@PathVariable(required = false) Boolean sortDesc) {
		if(orderByField!=null) {
			//active false
			if(!active&&orderByField.equals("name")&&sortDesc==null) {
				return menuRepository.findByActiveFalseOrderByName();
			}else if(!active&&orderByField.equals("name")&&!sortDesc) {
				return menuRepository.findByActiveFalseOrderByName();
			}else if(!active&&orderByField.equals("name")&&sortDesc) {
				return menuRepository.findByActiveFalseOrderByNameDesc();
			}else if(!active&&orderByField.equals("price")&&sortDesc==null) {
				return menuRepository.findByActiveFalseOrderByPrice();
			}else if(!active&&orderByField.equals("price")&&!sortDesc) {
				return menuRepository.findByActiveFalseOrderByPrice();
			}else if(!active&&orderByField.equals("price")&&sortDesc) {
				return menuRepository.findByActiveFalseOrderByPriceDesc();
			}
			//active true
			else if(active&&orderByField.equals("name")&&sortDesc==null) {
				return menuRepository.findByActiveTrueOrderByName();
			}else if(active&&orderByField.equals("name")&&!sortDesc) {
				return menuRepository.findByActiveTrueOrderByName();
			}else if(active&&orderByField.equals("name")&&sortDesc) {
				return menuRepository.findByActiveTrueOrderByNameDesc();
			}else if(active&&orderByField.equals("price")&&sortDesc==null) {
				return menuRepository.findByActiveTrueOrderByPrice();
			}else if(active&&orderByField.equals("price")&&!sortDesc) {
				return menuRepository.findByActiveTrueOrderByPrice();
			}else if(active&&orderByField.equals("price")&&sortDesc) {
				return menuRepository.findByActiveTrueOrderByPriceDesc();
			}
			//
			else {
				return menuRepository.findAll();
			}
		} else {
			if(!active) {
				return menuRepository.findByActiveFalse();
			} else {
				return menuRepository.findByActiveTrue();
			}
		}
	
	}
	
	@GetMapping(path={	"/menu/cat/{active}/{category}",
						"/menu/cat/{active}/{category}/{orderByField}/",
						"/menu/cat/{active}/{category}/{orderByField}/{sortDesc}"})
					public List<Menu> getMenusByCategory(	@PathVariable Boolean active,
															@PathVariable String category, 
															@PathVariable(required = false) String orderByField, 
															@PathVariable(required = false) Boolean sortDesc) {
					if(orderByField!=null) {
						//active false
						if(!active&&orderByField.equals("name")&&sortDesc==null) {
							return menuRepository.findByCategoryAndActiveFalseOrderByName(category);
						}else if(!active&&orderByField.equals("name")&&!sortDesc) {
							return menuRepository.findByCategoryAndActiveFalseOrderByName(category);
						}else if(!active&&orderByField.equals("name")&&sortDesc) {
							return menuRepository.findByCategoryAndActiveFalseOrderByNameDesc(category);
						}else if(!active&&orderByField.equals("price")&&sortDesc==null) {
							return menuRepository.findByCategoryAndActiveFalseOrderByPrice(category);
						}else if(!active&&orderByField.equals("price")&&!sortDesc) {
							return menuRepository.findByCategoryAndActiveFalseOrderByPrice(category);
						}else if(!active&&orderByField.equals("price")&&sortDesc) {
							return menuRepository.findByCategoryAndActiveFalseOrderByPriceDesc(category);
						}
						//active true
						else if(active&&orderByField.equals("name")&&sortDesc==null) {
							return menuRepository.findByCategoryAndActiveTrueOrderByName(category);
						}else if(active&&orderByField.equals("name")&&!sortDesc) {
							return menuRepository.findByCategoryAndActiveTrueOrderByName(category);
						}else if(active&&orderByField.equals("name")&&sortDesc) {
							return menuRepository.findByCategoryAndActiveTrueOrderByNameDesc(category);
						}else if(active&&orderByField.equals("price")&&sortDesc==null) {
							return menuRepository.findByCategoryAndActiveTrueOrderByPrice(category);
						}else if(active&&orderByField.equals("price")&&!sortDesc) {
							return menuRepository.findByCategoryAndActiveTrueOrderByPrice(category);
						}else if(active&&orderByField.equals("price")&&sortDesc) {
							return menuRepository.findByCategoryAndActiveTrueOrderByPriceDesc(category);
						}
						//
						else {
							return menuRepository.findAll();
						}
						} else {
							if(!active) {
								return menuRepository.findByCategoryAndActiveFalse(category);
							} else {
								return menuRepository.findByCategoryAndActiveTrue(category);
							}
						}
					
					}
	
	@GetMapping(path="/menu/id/{theId}")
	public Menu retrievePurchase(@PathVariable Integer theId) {
		Menu thePurchase = menuRepository.findById(theId).get();
		return thePurchase;
	}
	
	@PostMapping(path = "/menu")
	public ResponseEntity<Menu> createMenu(@RequestBody Menu theMenu) {
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
	public void updateMenu(@PathVariable Integer theId, @RequestBody Menu theMenu) {
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
	public void deleteMenu(@PathVariable Integer theId) {
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
