package com.inventory.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate orderDate;
    private Long customerId;
    private Long productId;
    private Integer quantity;
    private Double totalPrice;
	public void setId(Long id2) {
		// TODO Auto-generated method stub
		
	}

    // Getters and Setters
}
