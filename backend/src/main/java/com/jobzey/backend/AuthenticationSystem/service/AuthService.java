package com.jobzey.backend.AuthenticationSystem.service;


import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.jobzey.backend.AuthenticationSystem.dto.AuthResponse;
import com.jobzey.backend.AuthenticationSystem.dto.JobseekerRegisterRequestDto;
import com.jobzey.backend.AuthenticationSystem.dto.RecruiterRegisterRequestDto;
import com.jobzey.backend.model.JobseekerProfile;
import com.jobzey.backend.model.RecruiterProfile;
import com.jobzey.backend.model.User;
import com.jobzey.backend.repository.JobseekerProfileRepository;
import com.jobzey.backend.repository.RecruiterProfileRepository;
import com.jobzey.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Getter
@Setter
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobseekerProfileRepository jobseekerProfileRepository;

    @Autowired
    private RecruiterProfileRepository recruiterProfileRepository;



    @Transactional
    public AuthResponse registerJobseeker(JobseekerRegisterRequestDto requestDto){

        if (userRepository.existsByFirebaseUid(requestDto.getFirebaseUid())) {
            return AuthResponse.builder()
                    .success(false)
                    .message("User already registered")
                    .build();
        }

        if (userRepository.existsByEmail(requestDto.getEmail())) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Email already in use")
                    .build();
        }

        User user = User.builder()
                .firebaseUid(requestDto.getFirebaseUid())
                .email(requestDto.getEmail())
                .role(User.Role.jobseeker)
                .build();

        User saveUser = userRepository.save(user);

        JobseekerProfile profiles = JobseekerProfile.builder()
                .user(saveUser)
//                .experience(0)
                .openToWork(true)
                .build();

        jobseekerProfileRepository.save(profiles);






        setFirebaseCustomClaim(requestDto.getFirebaseUid(), "jobseeker");

        return AuthResponse.builder()
                .success(true)
                .message("Registration success")
                .role("jobseeker")
                .userId(saveUser.getId())
                .email(saveUser.getEmail())
                .build();
    }

    @Transactional
    public AuthResponse recruiterRegister(RecruiterRegisterRequestDto requestDto){

        if (userRepository.existsByFirebaseUid(requestDto.getFirebaseUid())) {
            return AuthResponse.builder()
                    .success(false)
                    .message("User already registered")
                    .build();
        }

        if (userRepository.existsByEmail(requestDto.getEmail())) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Email already in use")
                    .build();
        }

        User user = User.builder()
                .firebaseUid(requestDto.getFirebaseUid())
                .email(requestDto.getEmail())
                .username(requestDto.getUsername())
                .role(User.Role.recruiter)
                .build();

        User savedUser = userRepository.save(user);

        RecruiterProfile profile = RecruiterProfile.builder()
                .user(savedUser)
                .fullName(requestDto.getUsername())
                .build();

        recruiterProfileRepository.save(profile);

        setFirebaseCustomClaim(requestDto.getFirebaseUid(), "recruiter");


        return AuthResponse.builder()
                .success(true)
                .message("Register Success")
                .role("recruiter")
                .userId(user.getId())
                .email(user.getEmail())
                .userName(user.getUsername())
                .build();
    }

    private void setFirebaseCustomClaim(String firebaseUid, String role) {
        try {
            Map<String, Object> claims = new HashMap<>();
            claims.put("role", role);
            FirebaseAuth.getInstance().setCustomUserClaims(firebaseUid, claims);
        } catch (FirebaseAuthException e) {
            System.err.println("Failed to set Firebase custom claim: " + e.getMessage());
        }
    }
}
