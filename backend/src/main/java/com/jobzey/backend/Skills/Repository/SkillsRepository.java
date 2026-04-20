package com.jobzey.backend.Skills.Repository;

import com.jobzey.backend.Skills.Model.SkillsModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SkillsRepository  extends JpaRepository<SkillsModel, Long> {

    Optional<SkillsModel> findById(int id);
    Optional<SkillsModel> findByName(String name);
}