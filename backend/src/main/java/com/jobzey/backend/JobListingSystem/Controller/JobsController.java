package com.jobzey.backend.JobListingSystem.Controller;

import com.jobzey.backend.JobListingSystem.Model.Jobs;
import com.jobzey.backend.JobListingSystem.Service.JobsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobsController {

    private final JobsService jobsService;

    public JobsController(JobsService jobsService) {
        this.jobsService = jobsService;
    }

    @GetMapping("/get")
    public ResponseEntity<List<Jobs>> getAllJobs(){
        List<Jobs> response =  jobsService.getJobs();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/get/suggested")
    public ResponseEntity<List<Jobs>> getSuggestedJobs(){
        List<Jobs> response = jobsService.getSuggestedJobs();
        return ResponseEntity.ok(response);

    }
}
