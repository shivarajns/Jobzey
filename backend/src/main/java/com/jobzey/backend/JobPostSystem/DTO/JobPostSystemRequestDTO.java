package com.jobzey.backend.JobPostSystem.DTO;

import lombok.*;

import java.time.LocalDateTime;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JobPostSystemRequestDTO {
    private int userId;
    private String title;
    private String description;
    private int minSalary;
    private int maxSalary;
    private String currencyType;
    private String jobType;
    private int minExp;
    private int maxExp;
    private String location;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int categoryId;
    private String status;
}
