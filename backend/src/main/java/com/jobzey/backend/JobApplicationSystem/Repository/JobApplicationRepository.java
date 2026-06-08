package com.jobzey.backend.JobApplicationSystem.Repository;

import com.jobzey.backend.JobApplicationSystem.Model.JobApplicationModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplicationModel, Long> {
    Optional<JobApplicationModel>
    findByJob_IdAndJobseekerProfile_User_Id(
            Long jobId,
            int userId
    );

    @Query(
            """
                    SELECT a
                    FROM JobApplicationModel a
                    JOIN FETCH a.job
                    WHERE a.jobseekerProfile.id = :jobseekerId
                    ORDER BY a.appliedOn DESC
            """
    )
    List<JobApplicationModel> findByJobseekerProfile_Id (int jobseekerId);
}
