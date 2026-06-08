package com.jobzey.backend.JobApplicationSystem.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "application_status_history")
public class JobApplicationHistoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "application_id", nullable = false)
    private int applicationId;

    @Column(name = "application_status", nullable = false)
    @Enumerated( EnumType.STRING)
    private Status status;

    @Column(name = "updated")
    private LocalDateTime updated;

    public enum Status{
        APPLIED,
        VIEWED,
        SHORTLISTED,
        INTERVIEW,
        OFFER_RELEASED,
        ACCEPTED,
        REJECTED
    }
}
