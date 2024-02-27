package com.zosh.service;

import com.zosh.config.JwtProvider;

import com.zosh.domain.USER_ROLE;
import com.zosh.model.User;

import com.zosh.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImplementation implements UserService {


	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	private PasswordEncoder passwordEncoder;
	
	public UserServiceImplementation(
			UserRepository userRepository,
			JwtProvider jwtProvider,
			PasswordEncoder passwordEncoder
		) {
		
		this.userRepository=userRepository;
		this.jwtProvider=jwtProvider;
		this.passwordEncoder=passwordEncoder;

		
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws Exception {
		String email=jwtProvider.getEmailFromJwtToken(jwt);
		
		
		User user = userRepository.findByEmail(email);
		
		if(user==null) {
			throw new Exception("user not exist with email "+email);
		}
//		System.out.println("email user "+user.get().getEmail());
		return user;
	}

	@Override
	public List<User> findAllUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

	@Override
	public User findUserById(Long userId) throws Exception {
		Optional<User> optionalUser =userRepository.findById(userId);
		if(optionalUser.isEmpty()){
			throw new Exception("user not found...");
		}
		return optionalUser.get();
	}

	@Override
	public List<User> getAllEmployee() {

		return userRepository.findByRole(USER_ROLE.ROLE_EMPLOYEE);
	}

	@Override
	public User createAdmin(User user) {
		User createdUser=new User();
		createdUser.setRole(USER_ROLE.ROLE_ADMIN);
		createdUser.setFullName(user.getFullName());
		createdUser.setEmail(user.getEmail());
		createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(createdUser);
	}

	@Override
	public List<User> getAllAdmin() {
		return userRepository.findByRole(USER_ROLE.ROLE_ADMIN);
	}

	@Override
	public void deleteUser(Long userId) throws Exception {
		User user = findUserById(userId);
		userRepository.delete(user);
	}


	@Override
	public User findUserByEmail(String username) throws Exception {
		
		User user=userRepository.findByEmail(username);
		
		if(user!=null) {
			
			return user;
		}
		
		throw new Exception("user not exist with username "+username);
	}



}
