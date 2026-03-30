package com.jobzey.backend.AuthenticationSystem.repository;

import com.jobzey.backend.AuthenticationSystem.model.JobseekerExperience;
import com.jobzey.backend.AuthenticationSystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobseekerExperienceRepository extends JpaRepository<Long, JobseekerExperience> {

    Optional<JobseekerExperience> findByUser(User user);
    Optional<JobseekerExperience> findByUserId(int userId);

    void deleteByUser(User user);
}
