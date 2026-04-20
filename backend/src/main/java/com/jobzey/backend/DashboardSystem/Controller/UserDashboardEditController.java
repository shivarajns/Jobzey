package com.jobzey.backend.DashboardSystem.Controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.jobzey.backend.DashboardSystem.DTO.RecruiterDashboardEditRequestDto;
import com.jobzey.backend.DashboardSystem.DTO.jobseekerDashboardEditRequestDTO;
import com.jobzey.backend.DashboardSystem.Service.UserDashboardEditService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard/edit")
public class UserDashboardEditController {

    private final UserDashboardEditService userDashboardEditService;

    public UserDashboardEditController(UserDashboardEditService userDashboardEditService) {
        this.userDashboardEditService = userDashboardEditService;
    }

    @PutMapping("/jobseeker")
    public ResponseEntity<String> editJobseekerDashboard (
            @RequestHeader ("Authorization")  String authHead,
            @RequestBody
            jobseekerDashboardEditRequestDTO request
    ) throws FirebaseAuthException {
        String token = authHead.replace("Bearer ", "").trim();
        FirebaseToken decodeToken = FirebaseAuth.getInstance().verifyIdToken(token);
        String firebaseUid = decodeToken.getUid();

        userDashboardEditService.editJobseekerDashboard(firebaseUid, request);
        return ResponseEntity.ok("Profile updated successfully");

    }

    @PutMapping("/recruiter")
    public ResponseEntity<String> editRecruiterDashboard(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody RecruiterDashboardEditRequestDto request
    ) throws FirebaseAuthException
    {
        String token = authHeader.replace("Bearer ", "").trim();
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
        String firebaseUid = decodedToken.getUid();

        userDashboardEditService.editRecruiterDashboard(firebaseUid, request);
        return ResponseEntity.ok("Profile updated Successfully");
    }
}
