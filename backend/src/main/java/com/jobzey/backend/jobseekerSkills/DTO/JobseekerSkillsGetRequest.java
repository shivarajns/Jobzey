package com.jobzey.backend.jobseekerSkills.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobseekerSkillsGetRequest {

    private int userId;
}
