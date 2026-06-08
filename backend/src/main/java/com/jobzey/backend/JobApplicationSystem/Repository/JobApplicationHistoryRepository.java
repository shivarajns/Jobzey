package com.jobzey.backend.JobApplicationSystem.Repository;

import com.jobzey.backend.JobApplicationSystem.Model.JobApplicationHistoryModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationHistoryRepository extends JpaRepository<JobApplicationHistoryModel, Long> {
    List<JobApplicationHistoryModel> findByApplicationId(int id);
}
