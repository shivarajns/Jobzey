package com.jobzey.backend.AppliedJobSystem.Service;

import com.jobzey.backend.AppliedJobSystem.DTO.AppliedJobSystemResponseDTO;
import com.jobzey.backend.JobApplicationSystem.Model.JobApplicationModel;
import com.jobzey.backend.JobApplicationSystem.Repository.JobApplicationRepository;
import com.jobzey.backend.model.JobseekerProfile;
import com.jobzey.backend.model.User;
import com.jobzey.backend.repository.JobseekerProfileRepository;
import com.jobzey.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AppliedJobSystemService {

    private final JobApplicationRepository repository;
    private final JobseekerProfileRepository jobseekerProfile;
    public AppliedJobSystemService(JobApplicationRepository repository, JobseekerProfileRepository jobseekerProfile) {
        this.repository = repository;
        this.jobseekerProfile = jobseekerProfile;
    }

    @Transactional
    public List<AppliedJobSystemResponseDTO> getAppliedJob(int userId){

        JobseekerProfile jobseekerId = jobseekerProfile.findByUser_Id(userId).orElseThrow(
                ()-> new UsernameNotFoundException("User with Id not found")
        );
        int JobseekerId = jobseekerId.getId();
        System.out.println("User ID is"+userId);
        List<JobApplicationModel> applications = repository.findByJobseekerProfile_Id(JobseekerId);

        return applications.stream()
                .map(application -> AppliedJobSystemResponseDTO.builder()
                        .id(application.getApplicationId())
                        .jobId(application.getJob().getId())
                        .jobTitle(application.getJob().getTitle())
                        .appliedAt(application.getAppliedOn())
//                        .status(application.get)
                        .build()
                ).toList();
    }
}
