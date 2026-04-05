package com.jobzey.backend.repository;

import com.jobzey.backend.model.JobseekerExperience;
import com.jobzey.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobseekerExperienceRepository extends JpaRepository<JobseekerExperience, Long> {

    Optional<JobseekerExperience> findByUser(User user);
    Optional<JobseekerExperience> findByUserId(int userId);

    void deleteByUser(User user);
}
