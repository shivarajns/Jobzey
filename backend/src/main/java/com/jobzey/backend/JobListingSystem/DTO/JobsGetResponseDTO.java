package com.jobzey.backend.JobListingSystem.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobsGetResponseDTO {

    private int id;
    private String recruiterId;
    private String title;
    private String description;
    private int minSalary;
    private int maxSalary;
    private String currency;
    private String location;
    private String jobType;
    private int minExp;
    private int maxExp;
    private String status;
    private int categoryId;
    private String createdAt;
}
