package com.jobzey.backend.DashboardSystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class JobseekerDetailsResponseDTO extends UserDashboardResponseDTO{

    private String bio;
    private String dob;
    private String gender;
    private String location;
    private String portfolioUrl;
    private String resumeUrl;
    private String interestedDomains;
    private String isOpenToWork;
    private String currentDesi;
    private String currentCompany;
    private int expYears;

}
