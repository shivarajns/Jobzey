package com.jobzey.backend.ViewPostedJobs.Controller;

import com.jobzey.backend.JobListingSystem.Model.Jobs;
import com.jobzey.backend.ViewPostedJobs.DTO.ViewPostedJobsResponseDTO;
import com.jobzey.backend.ViewPostedJobs.Service.ViewPostedJobsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recruiter/get")
public class ViewPostedJobsController {

    private final ViewPostedJobsService service;

    public ViewPostedJobsController(ViewPostedJobsService service) {
        this.service = service;
    }

    @GetMapping("/posted/jobs/{recruiterId}")
    public ResponseEntity<List<ViewPostedJobsResponseDTO>> getPostedJobs(
            @PathVariable int recruiterId
    ) {
        List<ViewPostedJobsResponseDTO> jobs = service.getPostedJobs(recruiterId);

        return ResponseEntity.ok(jobs);
    }
}
