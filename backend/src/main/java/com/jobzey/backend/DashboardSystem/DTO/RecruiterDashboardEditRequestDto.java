package com.jobzey.backend.DashboardSystem.UserDashboard.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecruiterDashboardEditRequestDto extends UserDashboardEditRequestDto{
    private String jobTitle;
    private String companyName;
    private String companyWebsite;
    private String companySize;
    private String industry;
    private String companyDescription;
    private String expYears;
    private String linkedInUrl;
}
