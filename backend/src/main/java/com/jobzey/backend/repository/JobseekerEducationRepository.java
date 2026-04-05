package com.jobzey.backend.repository;

import com.jobzey.backend.model.JobSeekerEducation;
import com.jobzey.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobseekerEducationRepository extends JpaRepository<JobSeekerEducation, Long> {

    Optional<JobSeekerEducation> findByUser(User user);
    Optional<JobSeekerEducation> findByUserId(int userId);

    void deleteByUser(User user);
}
