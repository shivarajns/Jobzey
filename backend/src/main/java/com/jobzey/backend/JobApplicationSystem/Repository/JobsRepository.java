package com.jobzey.backend.JobApplicationSystem.Repository;

import com.jobzey.backend.JobApplicationSystem.Model.Jobs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobsRepository extends JpaRepository<Jobs, Long> {
    Optional<Jobs> findByCategoryId(int categoryId);
    List<Jobs> findTop5ByStatusOrderByCreatedAtDesc(Jobs.Status status);
}
