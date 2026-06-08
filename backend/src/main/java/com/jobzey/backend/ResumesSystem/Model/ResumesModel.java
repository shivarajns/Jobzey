package com.jobzey.backend.ResumesSystem.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ResumesModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private int userId;

    private String originalFileName;

    private String storedFileName;

    private String fileUrl;

    private Long fileSize;

    private String mimiType;

    @Column(updatable = false)
    private LocalDateTime uploadedAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void prePresist(){
        this.uploadedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate(){
        this.uploadedAt = LocalDateTime.now();
    }
}
