package com.zosh.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.zosh.domain.USER_ROLE;

import jakarta.persistence.*;
import lombok.Data;



@Entity
@Data
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String fullName;
	private String email;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;

	@ManyToOne
	private Company company;

	private USER_ROLE role;

	
//	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
//	private Address addresses = new ArrayList<>();

}
