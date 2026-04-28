package com.jobzey.backend.jobseekerSkills.Service;

import com.jobzey.backend.jobseekerSkills.DTO.JobseekerSkillsAddRequest;
import com.jobzey.backend.jobseekerSkills.DTO.JobseekerSkillsGetRequest;
import com.jobzey.backend.jobseekerSkills.DTO.JobseekerSkillsGetResponse;
import com.jobzey.backend.jobseekerSkills.DTO.skillsDTO;
import com.jobzey.backend.jobseekerSkills.Exception.SkillsNotFoundException;
import com.jobzey.backend.jobseekerSkills.Model.JobseekerSkillsModel;
import com.jobzey.backend.jobseekerSkills.Repository.JobseekerSkillsRepo;
import jakarta.transaction.Transactional;
import org.apache.http.conn.util.PublicSuffixList;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobseekerSkillsService {

    private final JobseekerSkillsRepo skillsRepo;

    public JobseekerSkillsService(JobseekerSkillsRepo skillsRepo){
        this.skillsRepo = skillsRepo;
    }

    @Transactional
    public JobseekerSkillsModel createJobseekerSkills(JobseekerSkillsAddRequest request){
        JobseekerSkillsModel skill = new JobseekerSkillsModel();
        skill.setUserId(request.getUserId());
        skill.setSkillId(request.getSkillId());
        skill.setSkillName(request.getSkillName());
        skill.setSkillLevel(JobseekerSkillsModel.SkillLevel.valueOf(request.getSkillLevel()));

        return skillsRepo.save(skill);
    }

    public JobseekerSkillsGetResponse getSkills(JobseekerSkillsGetRequest request){
        List<JobseekerSkillsModel> skillsList = skillsRepo.findAllByUserId(request.getUserId());

        if(skillsList.isEmpty()){
            throw new SkillsNotFoundException("User skill not found");
        }

        List<skillsDTO> skills = skillsList.stream()
                .map(
                        skill -> new skillsDTO(
                                skill.getSkillId(),
                                skill.getSkillName(),
                                skill.getSkillLevel()
                        )
                )
                .toList();

        return JobseekerSkillsGetResponse.builder()
                .message("Skill fetched successfully")
                .skills(skills)
                .build();
    }


}
