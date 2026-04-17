package com.jobzey.backend.DashboardSystem.UserDashboard.DTO;

import io.netty.util.internal.StringUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class jobseekerDashboardEditRequestDTO extends UserDashboardEditRequestDto {
    private String bio;
    private LocalDate dob;
    private String gender;
    private String location;
    private String portfolioUrl;
    private String resumeUrl;
    private Boolean openToWork;
}
