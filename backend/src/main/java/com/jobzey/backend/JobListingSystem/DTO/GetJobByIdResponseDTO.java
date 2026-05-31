package com.jobzey.backend.JobListingSystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetJobByIdResponseDTO {
    private String title;
    private String Description;
    private int minSalary;
    private int maxSalary;
    private String currency;
    private String location;
    private String jobType;
    private int experienceMin;
    private int experienceMax;
    private String status;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;
    private int categoryId;
}
