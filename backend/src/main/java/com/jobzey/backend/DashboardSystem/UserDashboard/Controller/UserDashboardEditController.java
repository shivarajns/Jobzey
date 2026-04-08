package com.jobzey.backend.DashboardSystem.UserDashboard.Controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.jobzey.backend.DashboardSystem.UserDashboard.DTO.jobseekerDashboardEditRequestDTO;
import com.jobzey.backend.DashboardSystem.UserDashboard.Service.UserDashboardEditService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class UserDashboardEditController {

    private final UserDashboardEditService userDashboardEditService;

    public UserDashboardEditController(UserDashboardEditService userDashboardEditService) {
        this.userDashboardEditService = userDashboardEditService;
    }

    @PutMapping("/edit")
    public ResponseEntity<String> editDashboard (
            @RequestHeader ("Authorization")  String authHead,
            @RequestBody
            jobseekerDashboardEditRequestDTO request
    ) throws FirebaseAuthException {
        String token = authHead.replace("Bearer ", "").trim();
        FirebaseToken decodeToken = FirebaseAuth.getInstance().verifyIdToken(token);
        String firebaseUid = decodeToken.getUid();

        userDashboardEditService.editDashboard(firebaseUid, request);
        return ResponseEntity.ok("Profile updated successfully");

    }
}
