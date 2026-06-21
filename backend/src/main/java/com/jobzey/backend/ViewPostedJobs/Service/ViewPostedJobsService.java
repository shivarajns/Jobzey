package com.jobzey.backend.ViewPostedJobs.Service;

import com.jobzey.backend.JobListingSystem.Model.Jobs;
import com.jobzey.backend.JobListingSystem.Repository.JobsRepository;
import com.jobzey.backend.ViewPostedJobs.DTO.ViewPostedJobsResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ViewPostedJobsService {
    private final JobsRepository jobsRepository;

    public ViewPostedJobsService(JobsRepository jobsRepository) {
        this.jobsRepository = jobsRepository;
    }

    public List<ViewPostedJobsResponseDTO> getPostedJobs(int recruiterId){
        List<Jobs> jobs = jobsRepository.findByRecruiterId(recruiterId);

        return jobs.stream().map(
                job -> ViewPostedJobsResponseDTO.builder()
                        .jobId(job.getId())
                        .build()
        ).toList();
    }
}
