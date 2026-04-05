package com.jobzey.backend.repository;

import com.jobzey.backend.model.RecruiterProfile;
import com.jobzey.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecruiterProfileRepository extends JpaRepository<RecruiterProfile, Long> {
    Optional<RecruiterProfile> findByUser (User user);
    Optional<RecruiterProfile> findByUserId(int userId);
    boolean existsByUser(User user);
}
