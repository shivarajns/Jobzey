package com.jobzey.backend.ResumesSystem.Repository;

import com.jobzey.backend.ResumesSystem.Model.ResumesModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumesRepository extends JpaRepository<ResumesModel, Long> {
    Optional<ResumesModel> findByUserId(int userId);
    boolean existsByUserId(int userId);
    void deleteByUserId(int userId);
}
