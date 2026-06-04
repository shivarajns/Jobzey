package com.jobzey.backend.JobListingSystem.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "jobs")
public class Jobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int recruiterId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;


    private int minSalary;

    private int maxSalary;

    @Column(name = "currency")
    private String currencyType;

    @Enumerated(EnumType.STRING)
    @Column(name="job_type")
    private JobType jobType;

    @Column(name = "experience_min")
    private int minExp;

    @Column(name = "experience_max")
    private int maxExp;

    @Column(name = "location")
    private String location;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private int categoryId;

    @Enumerated(EnumType.STRING)
    private Status status;


    @PrePersist
    public void prePersist(){
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }


    public enum JobType{
       FULL_TIME,
        PART_TIME,
        CONTRACT,
        INTERNSHIP,
        REMOTE
    }

    public enum Status{
        ACTIVE,
        CLOSED,
        DRAFT
    }
}
