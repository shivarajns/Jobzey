package com.jobzey.backend.AuthenticationSystem.repository;

import com.jobzey.backend.AuthenticationSystem.model.JobSeekerSkills;
import com.jobzey.backend.AuthenticationSystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobseekerSkillsRepository extends JpaRepository<JobSeekerSkills, Long> {

    Optional<JobSeekerSkills> findByUser(User user);
    Optional<JobSeekerSkills> findByUserId(int userId);

    void deleteByUser(User user);
}
