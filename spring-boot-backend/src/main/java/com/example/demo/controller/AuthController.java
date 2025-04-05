package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;
//
//    
//    
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        Optional<User> authenticatedUser = userService.authenticate(user.getEmail(), user.getPassword());
        Map<String, Object> response = new HashMap<>();

        if (authenticatedUser.isPresent()) {
            String role = authenticatedUser.get().getEmail().contains("GeneralAdmin") ? "GENERALADMIN" :
                          authenticatedUser.get().getEmail().contains("student") ? "STUDENT" :
                          authenticatedUser.get().getEmail().contains("faculty") ? "FACULTY" :
                          authenticatedUser.get().getEmail().contains("researcher") ? "RESEARCHER" : "UNKNOWN";

            String token = jwtUtil.generateToken(user.getEmail(), role);
            response.put("token", token);
            response.put("email", user.getEmail());
            response.put("role", role);
            response.put("message", "Login Successful");
            return ResponseEntity.ok(response); // ✅ 200 OK
        } else {
            response.put("message", "Invalid Credentials");
            return ResponseEntity.status(403).body(response); // ✅ 403 Forbidden
        }
    }

}
