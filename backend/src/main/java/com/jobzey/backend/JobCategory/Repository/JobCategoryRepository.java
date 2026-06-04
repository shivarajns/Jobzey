package com.jobzey.backend.JobCategory.Repository;


import com.jobzey.backend.JobCategory.Model.JobCategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobCategoryRepository extends JpaRepository<JobCategoryModel, Long> {
    List<JobCategoryModel> findById(int id);
}
