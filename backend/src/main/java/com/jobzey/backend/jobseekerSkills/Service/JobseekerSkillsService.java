package com.jobzey.backend.jobseekerSkills.Service;

import com.jobzey.backend.jobseekerSkills.DTO.JobseekerSkillsRequest;
import com.jobzey.backend.jobseekerSkills.Model.JobseekerSkillsModel;
import com.jobzey.backend.jobseekerSkills.Repository.JobseekerSkillsRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class JobseekerSkillsService {

    private final JobseekerSkillsRepo skillsRepo;

    public JobseekerSkillsService(JobseekerSkillsRepo skillsRepo){
        this.skillsRepo = skillsRepo;
    }

    @Transactional
    public JobseekerSkillsModel createJobseekerSkills(JobseekerSkillsRequest request){
        JobseekerSkillsModel skill = new JobseekerSkillsModel();
        skill.setUserId(request.getUserId());
        skill.setSkillId(request.getSkillId());
        skill.setSkillName(request.getSkillName());
        skill.setSkillLevel(JobseekerSkillsModel.SkillLevel.valueOf(request.getSkillLevel()));

        return skillsRepo.save(skill);
    }


}
