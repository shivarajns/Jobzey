package com.jobzey.backend.jobseekerSkills.DTO;

import com.jobzey.backend.jobseekerSkills.Model.JobseekerSkillsModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class skillsDTO {
    private int skillId;
    private String skillName;
    private JobseekerSkillsModel.SkillLevel skillLevel;

}
