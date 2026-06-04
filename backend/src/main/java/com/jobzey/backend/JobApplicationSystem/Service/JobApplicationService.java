package com.jobzey.backend.JobApplicationSystem.Service;

import com.jobzey.backend.DashboardSystem.ExceptionHandling.ProfileNotFoundException;
import com.jobzey.backend.JobApplicationSystem.DTO.JobApplicationRequestDTO;
import com.jobzey.backend.JobApplicationSystem.DTO.JobApplicationResponseDTO;
import com.jobzey.backend.JobApplicationSystem.JobApplicationExceptions.JobNotFoundException;
import com.jobzey.backend.JobApplicationSystem.Model.JobApplicationModel;
import com.jobzey.backend.JobApplicationSystem.Repository.JobApplicationRepository;
import com.jobzey.backend.JobListingSystem.Model.Jobs;
import com.jobzey.backend.JobListingSystem.Repository.JobsRepository;
import com.jobzey.backend.model.JobseekerProfile;
import com.jobzey.backend.repository.JobseekerProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class JobApplicationService {
    private final JobApplicationRepository repository;
    private final JobsRepository jobsRepository;
    private final JobseekerProfileRepository jobseekerProfileRepository;

    JobApplicationService(JobApplicationRepository repository, JobsRepository jobsRepository, JobseekerProfileRepository jobseekerProfileRepository){
        this.repository = repository;
        this.jobsRepository = jobsRepository;
        this.jobseekerProfileRepository = jobseekerProfileRepository;
    }


    @Transactional
    public JobApplicationResponseDTO applyJob(JobApplicationRequestDTO requestDTO){

        Jobs job = jobsRepository.findById(requestDTO.getJobId()).orElseThrow(
                () ->
                        new JobNotFoundException("Job Not Found")

        );
        Optional<JobApplicationModel> existingApplication = repository.findByJob_IdAndJobseekerProfile_User_Id(
                requestDTO.getJobId(),
                requestDTO.getJobseekerId()
        );

        if(existingApplication.isPresent()){
            return JobApplicationResponseDTO.builder()
                    .message("User Already Applied for This job")
                    .build();
        }

        JobseekerProfile jobseekerProfile = jobseekerProfileRepository.findByUser_Id(requestDTO.getJobseekerId()).orElseThrow(
                ()-> new ProfileNotFoundException("Job seeker profile not found")
        );

        JobApplicationModel request = new JobApplicationModel();
        request.setJob(job);
        request.setJobseekerProfile(jobseekerProfile);
        request.setResumeURL(requestDTO.getResumeURL());

        repository.save(request);

        return JobApplicationResponseDTO.builder()
                .message("Applied Successfully")
                .build();
    }
}
