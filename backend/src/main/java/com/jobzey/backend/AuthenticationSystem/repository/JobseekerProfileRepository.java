package com.jobzey.backend.AuthenticationSystem.repository;

import com.jobzey.backend.AuthenticationSystem.model.JobseekerProfiles;
import com.jobzey.backend.AuthenticationSystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobseekerProfileRepository extends JpaRepository<JobseekerProfiles, Long> {
    Optional<JobseekerProfiles> findByUserId(int userId);
    boolean existsByUserId(String userId);
}
