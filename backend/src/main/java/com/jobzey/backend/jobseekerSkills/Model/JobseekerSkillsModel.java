package com.jobzey.backend.jobseekerSkills.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "jobseeker_skills")
public class JobseekerSkillsModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, name = "user_id")
    private int userId;

    @Column(name = "skill_id", nullable = false)
    private int skillId;

    @Column(nullable = false, name = "skill_name")
    private String skillName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "skill_level")
    private SkillLevel skillLevel;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public enum SkillLevel{
        beginner,
        intermediate,
        advanced,
        expert
    }

    @PrePersist
    public void prePersist(){
        this.createdAt = LocalDateTime.now();
    }
}
