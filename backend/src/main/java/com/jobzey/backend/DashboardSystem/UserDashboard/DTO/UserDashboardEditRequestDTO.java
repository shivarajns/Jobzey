package com.jobzey.backend.DashboardSystem.UserDashboard.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDashboardEditRequestDTO{
    private String username;
    private String phone;
    private String bio;
    private String dob;
    private String gender;
    private String location;
    private String portfolioUrl;
    private String resumeUrl;
    private String currDesignation;
    private String currCompany;
    private int expYear;
    private String interestedDomain;
    private boolean isOpenToWork;
}
