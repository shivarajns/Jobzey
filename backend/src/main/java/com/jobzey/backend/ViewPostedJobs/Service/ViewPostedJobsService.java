package com.jobzey.backend.ViewPostedJobs.Service;

import com.jobzey.backend.JobListingSystem.Model.Jobs;
import com.jobzey.backend.JobListingSystem.Repository.JobsRepository;
import com.jobzey.backend.ViewPostedJobs.DTO.ViewPostedJobsResponseDTO;
import com.jobzey.backend.model.RecruiterProfile;
import com.jobzey.backend.model.User;
import com.jobzey.backend.repository.RecruiterProfileRepository;
import com.jobzey.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class ViewPostedJobsService {
    private final JobsRepository jobsRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;

    public ViewPostedJobsService(JobsRepository jobsRepository,  RecruiterProfileRepository recruiterProfileRepository) {
        this.jobsRepository = jobsRepository;
        this.recruiterProfileRepository = recruiterProfileRepository;
    }

    public List<ViewPostedJobsResponseDTO> getPostedJobs(int userID){
        RecruiterProfile recruiter = recruiterProfileRepository.findByUserId(userID)
                .orElseThrow(()-> new RuntimeException("No applications found"));

        List<Jobs> jobs = jobsRepository.findByRecruiterId(recruiter.getId());

        return jobs.stream().map(
                job -> ViewPostedJobsResponseDTO.builder()
                        .jobId(job.getId())
                        .build()
        ).toList();
    }
}
