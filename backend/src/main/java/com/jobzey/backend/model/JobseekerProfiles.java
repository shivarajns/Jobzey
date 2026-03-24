package com.jobzey.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "jobseeker_profiles")
public class JobseekerProfiles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User userId;

    @Column(name = "full_name", length = 125)
    private String fullName;

    @Column(name="bio", columnDefinition = "TEXT")
    private String bio;

    @Column(name = "date_of_birth")
    private LocalDate dob;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "location", length = 125)
    private String location;

    @Column(name = "portfolio_url")
    private String profileURL;

    @Column(name = "resume_url")
    private String resumeURL;

    @Column(name = "current_designation")
    private String currDesignation;

    @Column(name = "current_company")
    private String currCompany;

    @Column(name = "experience_years")
    private Integer experience;

    @Column(name = "interested_domains")
    private String interestedDomain;

    @Column(name = "open_to_work")
    private Boolean openToWork;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;




    public enum Gender{
        male,
        female,
        other,
        prefer_not_to_say
    }

    @PrePersist
    public void prePersist(){
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();

        if(this.openToWork == null){
            this.openToWork = true;
        }

        if(this.experience == null){
            this.experience = 0;
        }
    }

    @PreUpdate
    public void preUpdate(){
        this.updatedAt = LocalDateTime.now();
    }

}
