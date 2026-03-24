package com.jobzey.backend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="recruiter_profiles")
public class RecruiterProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "job_title")
    private String jobTitle;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "company_website")
    private String companyWebsite;

    @Enumerated(EnumType.STRING)
    @Column(name = "company_size")
    private CompanySize companySize;

    @Column(name = "industry")
    private String industry;

    @Column(name = "company_description", columnDefinition = "TEXT")
    private String companyDescription;

    @Column(name = "experience_years")
    private String experience;

    @Column(name = "linkedin_url")
    private String linkedInUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;


    @Column(name = "updated_at")
    private LocalDateTime updatedAt;




    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate(){
        this.updatedAt = LocalDateTime.now();
    }

    public enum CompanySize{
        SIZE_1_10("1-10"),
        SIZE_11_50("11-50"),
        SIZE_51_200("51-200"),
        SIZE_201_500("201-500"),
        SIZE_500_PLUS("500+");

        public final String label;

        CompanySize(String label){
            this.label = label;
        }

        @Override
        public String toString(){
            return label;
        }


    }

}
