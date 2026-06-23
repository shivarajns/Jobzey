package com.jobzey.backend.DashboardSystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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
