package com.jobzey.backend.JobApplicationSystem.Model;

import com.jobzey.backend.JobListingSystem.Model.Jobs;
import com.jobzey.backend.model.JobseekerProfile;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Table(
        name = "applications",
        uniqueConstraints = {
                @UniqueConstraint(

                        name = "uk_job_jobseeker",
                        columnNames = {"job_id", "jobseeker_id"}
                )
        }
)
public class JobApplicationModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_id")
    private Long applicationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn( name = "job_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_application_job_id"))
    private Jobs job;


    @ManyToOne
    @JoinColumn(name = "jobseeker_id",
                nullable = false,
                foreignKey = @ForeignKey(name = "fk_application_jobseeker")
    )
    private JobseekerProfile jobseekerProfile;

    @Column(name = "resume_url", nullable = false)
    private String resumeURL;

    @Column(name = "applied_on", updatable = false)
    private LocalDateTime appliedOn;

    @Column(name = "updated_on")
    private LocalDateTime updatedOn;

    @PrePersist
    public void prePersist(){
        this.appliedOn = LocalDateTime.now();
        this.updatedOn = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate(){
        this.updatedOn = LocalDateTime.now();
    }
}
