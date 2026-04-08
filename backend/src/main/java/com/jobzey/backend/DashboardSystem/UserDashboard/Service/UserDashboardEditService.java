package com.jobzey.backend.DashboardSystem.UserDashboard.Service;

import com.jobzey.backend.DashboardSystem.UserDashboard.DTO.jobseekerDashboardEditRequestDTO;
import com.jobzey.backend.DashboardSystem.UserDashboard.ExceptionHandling.ProfileNotFoundException;
import com.jobzey.backend.DashboardSystem.UserDashboard.ExceptionHandling.userRoleNotFound;
import com.jobzey.backend.model.JobseekerProfile;
import com.jobzey.backend.model.User;
import com.jobzey.backend.repository.JobseekerProfileRepository;
import com.jobzey.backend.repository.RecruiterProfileRepository;
import com.jobzey.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class UserDashboardEditService {
    private final UserRepository userRepository;
    private final JobseekerProfileRepository jobseekerProfile;
    private final RecruiterProfileRepository recruiterProfile;


    public UserDashboardEditService(UserRepository userRepository, JobseekerProfileRepository jobseekerProfile, RecruiterProfileRepository recruiterProfile) {
        this.userRepository = userRepository;
        this.jobseekerProfile = jobseekerProfile;
        this.recruiterProfile = recruiterProfile;
    }

    @Transactional
    public void editDashboard(String firebaseUid, jobseekerDashboardEditRequestDTO editRequest){
        User user = userRepository.findByFirebaseUid(firebaseUid).orElseThrow(
                ()-> new ProfileNotFoundException("User profile not found")
        );
        user.setUsername(editRequest.getUsername());
        user.setPhone(editRequest.getPhone());




        if(user.getRole() == null){
            throw new userRoleNotFound("User Role Not Found");
        }

        switch (user.getRole()) {
            case jobseeker -> {
                JobseekerProfile profile = jobseekerProfile.findByUser_Id(user.getId()).orElseThrow(
                        ()-> new ProfileNotFoundException("User profile not found")
                );
                profile.setBio(editRequest.getBio());
                profile.setDob(editRequest.getDob());
                profile.setGender(JobseekerProfile.Gender.valueOf(editRequest.getGender()));
                profile.setLocation(editRequest.getLocation());
                profile.setPortfolioUrl(editRequest.getPortfolioUrl());
                profile.setResumeURL(editRequest.getResumeUrl());
                profile.setCurrCompany(editRequest.getCurrCompany());
                profile.setCurrDesignation(editRequest.getCurrDesignation());
                profile.setExperience(editRequest.getExpYear());
                profile.setInterestedDomain(editRequest.getInterestedDomain());
                profile.setOpenToWork(editRequest.getOpenToWork());
                jobseekerProfile.save(profile);
            }
        }

        userRepository.save(user);

    }
}
