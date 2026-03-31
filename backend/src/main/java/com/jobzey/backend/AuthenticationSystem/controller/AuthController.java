package com.jobzey.backend.AuthenticationSystem.controller;

import com.jobzey.backend.AuthenticationSystem.dto.AuthResponse;
import com.jobzey.backend.AuthenticationSystem.dto.JobseekerRegisterRequestDto;
import com.jobzey.backend.AuthenticationSystem.dto.RecruiterRegisterRequestDto;
import com.jobzey.backend.AuthenticationSystem.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register/jobseeker")
    public ResponseEntity<AuthResponse> registerJobSeeker(
            @RequestBody JobseekerRegisterRequestDto requestDto
            ){
        AuthResponse response = authService.registerJobseeker(requestDto);

        if(response.isSuccess()){
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @PostMapping("/register/recruiter")
    public ResponseEntity<AuthResponse> registerRecruiter(
            @RequestBody RecruiterRegisterRequestDto requestDto
            ){
        AuthResponse response = authService.recruiterRegister(requestDto);

        if(response.isSuccess()){
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @GetMapping("/test/public")
    public ResponseEntity<String> publicTest() {
        return ResponseEntity.ok("Public endpoint working ✅");
    }

    @GetMapping("/test/protected")
    public ResponseEntity<String> protectedTest() {
        return ResponseEntity.ok("Protected endpoint working ✅ — your token is valid!");
    }
}
