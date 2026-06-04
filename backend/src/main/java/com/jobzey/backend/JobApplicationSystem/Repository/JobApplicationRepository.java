package com.jobzey.backend.JobApplicationSystem.Repository;

import com.jobzey.backend.JobApplicationSystem.Model.JobApplicationModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplicationModel, Long> {
    Optional<JobApplicationModel>
    findByJob_IdAndJobseekerProfile_User_Id(
            Long jobId,
            int userId
    );
}
