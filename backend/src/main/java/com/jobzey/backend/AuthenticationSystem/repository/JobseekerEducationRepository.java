package com.jobzey.backend.AuthenticationSystem.repository;

import com.jobzey.backend.AuthenticationSystem.model.JobSeekerEducation;
import com.jobzey.backend.AuthenticationSystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobseekerEducationRepository extends JpaRepository<JobSeekerEducation, Long> {

    Optional<JobSeekerEducation> findByUser(User user);
    Optional<JobSeekerEducation> findByUserId(int userId);

    void deleteByUser(User user);
}
