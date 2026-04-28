package com.jobzey.backend.jobseekerSkills.Repository;

import com.jobzey.backend.jobseekerSkills.Model.JobseekerSkillsModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobseekerSkillsRepo extends JpaRepository<JobseekerSkillsModel, Long> {
    Optional<JobseekerSkillsModel> findById(int id);
    Optional<JobseekerSkillsModel> findBySkillName(String name);
    Optional<JobseekerSkillsModel> findByUserId(int userId);
    List<JobseekerSkillsModel> findAllByUserId(int userId);
}
