package com.jobzey.backend.ResumesSystem.Controller;

import com.jobzey.backend.ResumesSystem.Service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload")
public class ResumesController {

    private final ResumeService resumeService;
    public ResumesController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/resume")
    public ResponseEntity<String> uploadResume(
            @RequestParam int userId,
            @RequestParam MultipartFile file
            ){

        resumeService.uploadResume(userId, file);
        return ResponseEntity.ok("Resume Uploaded Successfully");
    }
}
