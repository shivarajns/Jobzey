package com.jobzey.backend.jobseekerSkills.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobseekerSkillsAddResponse {

    private String message;
    private int id;
    private int userId;
    private int skillId;
    private String skillName;
    private String skillLevel;
}
