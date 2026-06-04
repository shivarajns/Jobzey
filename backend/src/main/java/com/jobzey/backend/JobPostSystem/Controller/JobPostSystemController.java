package com.jobzey.backend.JobPostSystem.Controller;

import com.jobzey.backend.JobApplicationSystem.DTO.JobApplicationRequestDTO;
import com.jobzey.backend.JobApplicationSystem.DTO.JobApplicationResponseDTO;
import com.jobzey.backend.JobPostSystem.DTO.JobPostSystemRequestDTO;
import com.jobzey.backend.JobPostSystem.DTO.JobPostSystemResponseDTO;
import com.jobzey.backend.JobPostSystem.Service.JobPostSystemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("recruiter/job")
public class JobPostSystemController {

    private final JobPostSystemService service;


    public JobPostSystemController(JobPostSystemService service) {
        this.service = service;
    }

    @PutMapping("/create")
    public ResponseEntity<JobPostSystemResponseDTO> postJob(
            @RequestBody JobPostSystemRequestDTO requestDTO
            ) {

        JobPostSystemResponseDTO response = service.postJob(requestDTO);
        return ResponseEntity.ok(response);
    }
}
