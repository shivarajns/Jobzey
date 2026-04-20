package com.jobzey.backend.DashboardSystem.Service;

import com.jobzey.backend.DashboardSystem.DTO.RecruiterDashboardEditRequestDto;
import com.jobzey.backend.DashboardSystem.DTO.jobseekerDashboardEditRequestDTO;
import com.jobzey.backend.DashboardSystem.ExceptionHandling.ProfileNotFoundException;
import com.jobzey.backend.DashboardSystem.ExceptionHandling.userRoleNotFound;
import com.jobzey.backend.model.JobseekerProfile;
import com.jobzey.backend.model.RecruiterProfile;
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
    public void editJobseekerDashboard(String firebaseUid, jobseekerDashboardEditRequestDTO editRequest)
    {
        User user = userRepository.findByFirebaseUid(firebaseUid).orElseThrow(
                ()-> new ProfileNotFoundException("User profile not found")
        );
        user.setUsername(editRequest.getUsername());
        user.setPhone(editRequest.getPhone());

            if(user.getRole() == null)
            {
                throw new userRoleNotFound("User Role Not Found");
            }

                JobseekerProfile profile = jobseekerProfile.findByUser_Id(user.getId()).orElseThrow(
                        ()-> new ProfileNotFoundException("User profile not found")
                );
                profile.setBio(editRequest.getBio());
                profile.setDob(editRequest.getDob());
                profile.setGender(JobseekerProfile.Gender.valueOf(editRequest.getGender()));
                profile.setLocation(editRequest.getLocation());
                profile.setPortfolioUrl(editRequest.getPortfolioUrl());
                profile.setResumeURL(editRequest.getResumeUrl());
                profile.setOpenToWork(editRequest.getOpenToWork());
                jobseekerProfile.save(profile);

        userRepository.save(user);

    }

    @Transactional
    public void editRecruiterDashboard(String firebaseUid, RecruiterDashboardEditRequestDto request)
    {
        User user = userRepository.findByFirebaseUid(firebaseUid)
                .orElseThrow(
                        ()-> new ProfileNotFoundException("User profile not Found")
                );

        user.setUsername(request.getUsername());
        user.setPhone(request.getPhone());

        if (user.getRole() == null) {
            throw new userRoleNotFound("User role not found");
        }

        RecruiterProfile profile = recruiterProfile.findByUserId(user.getId())
                .orElseThrow(
                        ()-> new ProfileNotFoundException("User profile is not found")
                );
        profile.setJobTitle(request.getJobTitle());
        profile.setCompanyName(request.getCompanyName());
        profile.setCompanyWebsite(request.getCompanyWebsite());
        profile.setCompanySize(RecruiterProfile.CompanySize.valueOf(request.getCompanySize()));
        profile.setIndustry(request.getIndustry());
        profile.setCompanyDescription(request.getCompanyDescription());
        profile.setExperience(request.getExpYears());
        profile.setLinkedInUrl(request.getLinkedInUrl());

        recruiterProfile.save(profile);
        userRepository.save(user);
    }
}
