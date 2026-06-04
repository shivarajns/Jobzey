package com.jobzey.backend.JobCategory.Controller;

import com.jobzey.backend.JobCategory.DTO.JobCategoryResponseDTO;
import com.jobzey.backend.JobCategory.Model.JobCategoryModel;
import com.jobzey.backend.JobCategory.Service.JobCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobCategoryController {

    private final JobCategoryService service;
    public JobCategoryController(JobCategoryService service) {
        this.service = service;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<JobCategoryModel>> getJobCategory(){
        List<JobCategoryModel> response = service.getJobCategory();
        return ResponseEntity.ok(response);
    }
}
