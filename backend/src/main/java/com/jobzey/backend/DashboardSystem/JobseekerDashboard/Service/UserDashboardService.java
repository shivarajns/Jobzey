package com.jobzey.backend.DashboardSystem.JobseekerDashboard.Service;

import com.jobzey.backend.DashboardSystem.JobseekerDashboard.DTO.RecruiterDashboardResponseDTO;
import com.jobzey.backend.DashboardSystem.JobseekerDashboard.DTO.UserDashboardResponseDTO;
import com.jobzey.backend.DashboardSystem.JobseekerDashboard.ExceptionHandling.ProfileNotFoundException;
import com.jobzey.backend.model.RecruiterProfile;
import com.jobzey.backend.model.User;
import com.jobzey.backend.repository.RecruiterProfileRepository;
import com.jobzey.backend.repository.UserRepository;
import org.springframework.stereotype.Service;


@Service
public class UserDashboardService {

    private final UserRepository userRepository;
    private final RecruiterProfileRepository recruiterProfile;


    public UserDashboardService(UserRepository userRepository, RecruiterProfileRepository recruiterProfile) {
        this.userRepository = userRepository;
        this.recruiterProfile = recruiterProfile;
    }

    public UserDashboardResponseDTO getDashboardData(String firebaseUid){
        User user = userRepository.findByFirebaseUid(firebaseUid).orElseThrow(
                ()-> new ProfileNotFoundException("User with this Firebase UID not found in the database")
        );

        if (user.getRole() == null) {
            return UserDashboardResponseDTO.builder()
                    .message("User profile fetched successfully")
                    .email(user.getEmail())
                    .username(user.getUsername())
                    .phone(user.getPhone())
                    .role("N/A")
                    .build();
        }

        switch (user.getRole())
        {
            case recruiter ->
            {
                    RecruiterProfile recruiterProfile1 = recruiterProfile.findByUserId(user.getId()).orElseThrow(
                            ()-> new ProfileNotFoundException("Profile with userid is not found in Recruiter database")
                    );

                    return RecruiterDashboardResponseDTO.builder()
                            .message("User profile fetched successfully")
                            .email(user.getEmail())
                            .username(user.getUsername())
                            .phone(user.getPhone())
                            .role(user.getRole() != null ? user.getRole().name() : "N/A")
                            .jobTitle(recruiterProfile1.getJobTitle())
                            .companyName(recruiterProfile1.getCompanyName())
                            .companyWebsite(recruiterProfile1.getCompanyWebsite())
                            .companySize(recruiterProfile1.getCompanySize() != null ? recruiterProfile1.getCompanySize().name() : "N/A")
                            .industry(recruiterProfile1.getIndustry())
                            .companyDescription(recruiterProfile1.getCompanyDescription())
                            .experience(recruiterProfile1.getExperience())
                            .linkedInUrl(recruiterProfile1.getLinkedInUrl())
                            .build();
            }
                default ->
                {
                    return UserDashboardResponseDTO.builder()
                            .message("User profile Fetched Successfully")
                            .email(user.getEmail())
                            .username(user.getUsername())
                            .phone(user.getPhone())
                            .role(user.getRole() != null ? user.getRole().name() : "N/A")
                            .build();
                }
        }

    }



}
