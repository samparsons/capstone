package com.simplilearn.workshop.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TransactionTotal {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer Id;
	private Integer userid;
	private Double totalprice;
	private String paymentmethod;
	private String transactiondate;
	private String deliverydate;
	private String deliverytime;
	
	public TransactionTotal() {
		super();
	}

	

	public TransactionTotal(Integer userid, Double totalprice, String paymentmethod, String transactiondate,
			String deliverydate, String deliverytime) {
		super();
		this.userid = userid;
		this.totalprice = totalprice;
		this.paymentmethod = paymentmethod;
		this.transactiondate = transactiondate;
		this.deliverydate = deliverydate;
		this.deliverytime = deliverytime;
	}
	
	

	public String getPaymentmethod() {
		return paymentmethod;
	}
	
	public void setPaymentmethod(String paymentmethod) {
		this.paymentmethod = paymentmethod;
	}

	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public Double getTotalprice() {
		return totalprice;
	}

	public void setTotalprice(Double totalprice) {
		this.totalprice = totalprice;
	}

	public String getTransactiondate() {
		return transactiondate;
	}

	public void setTransactiondate(String transactiondate) {
		this.transactiondate = transactiondate;
	}

	public String getDeliverydate() {
		return deliverydate;
	}

	public void setDeliverydate(String deliverydate) {
		this.deliverydate = deliverydate;
	}

	public String getDeliverytime() {
		return deliverytime;
	}

	public void setDeliverytime(String deliverytime) {
		this.deliverytime = deliverytime;
	}

	public Integer getId() {
		return Id;
	}
	
	public void setId(Integer id) {
		Id = id;
	}

	@Override
	public String toString() {
		return "TransactionTotal [Id=" + Id + ", userid=" + userid + ", totalprice="
				+ totalprice + ", transactiondate=" + transactiondate + ", deliverydate=" + deliverydate
				+ ", deliverytime=" + deliverytime + "]";
	}
	
	
	
	
	
	

	
	
	

}
