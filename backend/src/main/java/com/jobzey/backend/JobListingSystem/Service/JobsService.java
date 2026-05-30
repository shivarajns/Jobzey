package com.jobzey.backend.JobListingSystem.Service;

import com.jobzey.backend.JobListingSystem.Model.Jobs;
import com.jobzey.backend.JobListingSystem.Repository.JobsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobsService {
    private final JobsRepository jobsRepo;

    public JobsService(JobsRepository jobsRepo) {
        this.jobsRepo = jobsRepo;
    }

    public List<Jobs> getJobs(){
        return jobsRepo.findAll();
    }

    public List<Jobs> getSuggestedJobs(){
        return jobsRepo.findTop5ByStatusOrderByCreatedAtDesc(Jobs.Status.ACTIVE);
    }
}
