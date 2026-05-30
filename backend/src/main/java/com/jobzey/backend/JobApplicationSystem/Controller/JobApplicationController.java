package com.jobzey.backend.JobApplicationSystem.Controller;

import com.jobzey.backend.JobApplicationSystem.DTO.JobApplicationRequestDTO;
import com.jobzey.backend.JobApplicationSystem.DTO.JobApplicationResponseDTO;
import com.jobzey.backend.JobApplicationSystem.Model.JobApplicationModel;
import com.jobzey.backend.JobApplicationSystem.Service.JobApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/job")
public class JobApplicationController {
    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    @PutMapping("/apply")
    public ResponseEntity<JobApplicationResponseDTO> jobApplication(
            @RequestBody JobApplicationRequestDTO requestDTO
            ){

        JobApplicationResponseDTO response = service.applyJob(requestDTO);
        return ResponseEntity.ok(response);
    }
}
