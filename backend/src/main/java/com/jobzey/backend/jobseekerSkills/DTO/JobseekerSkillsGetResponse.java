package com.jobzey.backend.jobseekerSkills.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobseekerSkillsGetResponse {

    private String message;
    private List<skillsDTO> skills;
}
