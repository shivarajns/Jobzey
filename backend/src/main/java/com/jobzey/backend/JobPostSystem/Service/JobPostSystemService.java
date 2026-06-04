package com.jobzey.backend.JobPostSystem.Service;

import com.jobzey.backend.DashboardSystem.ExceptionHandling.ProfileNotFoundException;
import com.jobzey.backend.JobListingSystem.Model.Jobs;
import com.jobzey.backend.JobListingSystem.Repository.JobsRepository;
import com.jobzey.backend.JobPostSystem.DTO.JobPostSystemRequestDTO;
import com.jobzey.backend.JobPostSystem.DTO.JobPostSystemResponseDTO;
import com.jobzey.backend.model.RecruiterProfile;
import com.jobzey.backend.repository.RecruiterProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class JobPostSystemService {

    private final JobsRepository repository;
    private final RecruiterProfileRepository profile;

    public JobPostSystemService(JobsRepository repository,  RecruiterProfileRepository profile) {
        this.repository = repository;
        this.profile = profile;
    }

    public JobPostSystemResponseDTO postJob(JobPostSystemRequestDTO request) {

        RecruiterProfile recruiterId = profile.findByUserId(request.getUserId()).orElseThrow(
                ()-> new ProfileNotFoundException("Recruiter Not Found")
        );

        int recruiterID = recruiterId.getId();

        Jobs job = new Jobs();
        job.setRecruiterId(recruiterID);
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setMinSalary(request.getMinSalary());
        job.setMaxSalary(request.getMaxSalary());
        job.setCurrencyType(request.getCurrencyType());
        job.setJobType(Jobs.JobType.valueOf(request.getJobType()));
        job.setMinExp(request.getMinExp());
        job.setMaxExp(request.getMaxExp());
        job.setLocation(request.getLocation());
        job.setExpiresAt(request.getExpiresAt());
        job.setCategoryId(request.getCategoryId());
        job.setStatus(Jobs.Status.valueOf(request.getStatus()));

        repository.save(job);
        return JobPostSystemResponseDTO.builder()
                .message("Job Created Successfully")
                .build();
    }
}
