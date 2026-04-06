package com.jobzey.backend.DashboardSystem.JobseekerDashboard.Controller;


import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.jobzey.backend.DashboardSystem.JobseekerDashboard.DTO.UserDashboardResponseDTO;
import com.jobzey.backend.DashboardSystem.JobseekerDashboard.Service.UserDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserDashboardProfileService {

    private final UserDashboardService dashboardService;


    public UserDashboardProfileService(UserDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<UserDashboardResponseDTO> getDashboardData(
            @RequestHeader("Authorization") String authHeader
    ) throws FirebaseAuthException {
        String token = authHeader.replace("Bearer ", "").trim();

        FirebaseToken decodeToken = FirebaseAuth.getInstance().verifyIdToken(token);
        String firebaseUid = decodeToken.getUid();

        UserDashboardResponseDTO responseDTO = dashboardService.getDashboardData(firebaseUid);
        return ResponseEntity.ok(responseDTO);
    }
}
