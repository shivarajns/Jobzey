package com.jobzey.backend.DashboardSystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class jobseekerDashboardEditRequestDTO extends UserDashboardEditRequestDto {
    private String bio;
    private LocalDate dob;
    private String gender;
    private String location;
    private String portfolioUrl;
    private String resumeUrl;
    private Boolean openToWork;
}
