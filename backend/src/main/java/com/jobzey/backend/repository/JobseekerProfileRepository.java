package com.jobzey.backend.repository;

import com.jobzey.backend.model.JobseekerProfile;
import com.jobzey.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobseekerProfileRepository extends JpaRepository<JobseekerProfile, Long> {
    Optional<JobseekerProfile> findByUser_Id(int userId);
    boolean existsByUserId(String userId);
}
