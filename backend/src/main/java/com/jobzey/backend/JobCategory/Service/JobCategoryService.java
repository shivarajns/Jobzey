package com.jobzey.backend.JobCategory.Service;

import com.jobzey.backend.JobCategory.DTO.JobCategoryResponseDTO;
import com.jobzey.backend.JobCategory.Model.JobCategoryModel;
import com.jobzey.backend.JobCategory.Repository.JobCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobCategoryService {

    private final JobCategoryRepository repository;
    public JobCategoryService(JobCategoryRepository repository) {
        this.repository = repository;
    }

    public List<JobCategoryModel> getJobCategory(){
        return repository.findAll();
    }
}
