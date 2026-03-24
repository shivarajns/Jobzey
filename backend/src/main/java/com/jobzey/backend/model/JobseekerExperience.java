package com.jobzey.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobseeker_experience")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobseekerExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "job_title", length = 150)
    private String jobTitle;

    @Column(name = "company_name", length = 200)
    private String companyName;

    @Column(name = "location", length = 150)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(name = "employment_type")
    private EmploymentType employmentType;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "is_current")
    private Boolean isCurrent = false;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        if (this.isCurrent == null) {
            this.isCurrent = false;
        }
    }

    public enum EmploymentType {
        full_time,
        part_time,
        internship,
        freelance,
        contract
    }
}
