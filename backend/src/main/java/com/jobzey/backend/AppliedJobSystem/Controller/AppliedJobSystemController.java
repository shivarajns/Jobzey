package com.jobzey.backend.AppliedJobSystem.Controller;

import com.jobzey.backend.AppliedJobSystem.DTO.AppliedJobSystemResponseDTO;
import com.jobzey.backend.AppliedJobSystem.Service.AppliedJobSystemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobseeker/applied")
public class AppliedJobSystemController {

    private final AppliedJobSystemService service;
    public AppliedJobSystemController(AppliedJobSystemService service) {
        this.service = service;
    }

    @GetMapping("/{jobseekerId}")
    public ResponseEntity<List<AppliedJobSystemResponseDTO>> getAppliedJob(
            @PathVariable int jobseekerId
    ) {
        List<AppliedJobSystemResponseDTO> response = service.getAppliedJob(jobseekerId);
        return ResponseEntity.ok(response);
    }
}
