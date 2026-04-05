package com.jobzey.backend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "jobseeker_skills")
public class JobSeekerSkills {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "skill_name", nullable = false)
    private String skillName;

    @Enumerated(EnumType.STRING)
    @Column(name = "skill_level")
    private SkillLevel skillLevel;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;


    public enum SkillLevel {
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
