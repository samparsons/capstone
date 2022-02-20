package com.simplilearn.workshop.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Menu {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer Id;
	private String name;
	private String description;
	private String category;
	private String imgurl;
	private Double price;
	
	public Menu() {
		super();
	}
	
	public Menu(String name, String description, String category,String imgurl, Double price) {
		super();
		this.name = name;
		this.description = description;
		this.category = category;
		this.imgurl = imgurl;
		this.price = price;
	}
	
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getImgurl() {
		return imgurl;
	}

	public void setImgurl(String imgurl) {
		this.imgurl = imgurl;
	}

	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "Menu [Id=" + Id + ", name=" + name + ", description=" + description + ", category=" + category
				+ ", imgurl=" + imgurl + ", price=" + price + "]";
	}

	
	
	

}
