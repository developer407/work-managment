package com.zosh.service;

import com.zosh.model.User;

import java.util.List;

public interface UserService {

	public User findUserProfileByJwt(String jwt) throws Exception;
	
	public User findUserByEmail(String email) throws Exception;

	public List<User> findAllUsers();

	public User findUserById(Long userId) throws Exception;





}
