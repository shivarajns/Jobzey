package com.jobzey.backend.DashboardSystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class RecruiterDashboardResponseDTO extends UserDashboardResponseDTO{

    private int userId;
    private String jobTitle;
    private String companyName;
    private String companyWebsite;
    private String companySize;
    private String industry;
    private String companyDescription;
    private String experience;
    private String linkedInUrl;
}
