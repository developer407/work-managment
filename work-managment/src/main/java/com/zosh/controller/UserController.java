package com.zosh.controller;

import com.zosh.model.User;
import com.zosh.response.ApiResponse;
import com.zosh.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/users/profile")
	public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String jwt) throws Exception {

		User user = userService.findUserProfileByJwt(jwt);


		return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
	}

	@GetMapping("/admin/employees")
	public ResponseEntity<List<User>> getAllEmployee(@RequestHeader("Authorization") String jwt) throws Exception {

		List<User> users = userService.getAllEmployee();


		return new ResponseEntity<>(users, HttpStatus.ACCEPTED);
	}

	@GetMapping("/super-admin/admins")
	public ResponseEntity<List<User>> getAllAdmin(@RequestHeader("Authorization") String jwt) throws Exception {

		List<User> users = userService.getAllAdmin();

		return new ResponseEntity<>(users, HttpStatus.ACCEPTED);
	}

	@PostMapping("/super-admin/create-admin")
	public ResponseEntity<User> createAdmin(@RequestBody User req) throws Exception {

		User user = userService.createAdmin(req);

		return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
	}

	@DeleteMapping ("/super-admin/delete/{userId}")
	public ResponseEntity<ApiResponse> deleteAdmin(@PathVariable Long userId) throws Exception {

		userService.deleteUser(userId);
		ApiResponse res=new ApiResponse();
		res.setStatus(true);
		res.setMessage("deleted successfully");

		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	}

}
