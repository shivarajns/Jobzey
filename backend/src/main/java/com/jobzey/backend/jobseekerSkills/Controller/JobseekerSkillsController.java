package com.jobzey.backend.jobseekerSkills.Controller;

import com.jobzey.backend.jobseekerSkills.DTO.JobseekerSkillsRequest;
import com.jobzey.backend.jobseekerSkills.DTO.JobseekerSkillsResponse;
import com.jobzey.backend.jobseekerSkills.Model.JobseekerSkillsModel;
import com.jobzey.backend.jobseekerSkills.Service.JobseekerSkillsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard/skills")
public class JobseekerSkillsController {

    private final JobseekerSkillsService skillsService;

    public JobseekerSkillsController(JobseekerSkillsService skillsService){
        this.skillsService = skillsService;
    }

    @PostMapping("/add")
    public ResponseEntity<JobseekerSkillsResponse> createJobseekerSkill(
            @RequestBody JobseekerSkillsRequest request
            ) {

        JobseekerSkillsModel save = skillsService.createJobseekerSkills(request);

        JobseekerSkillsResponse response = new JobseekerSkillsResponse();

        response.setMessage("Skills saved Successfully");
        response.setSkillId(save.getSkillId());
        response.setId(save.getId());
        response.setUserId(save.getUserId());
        response.setSkillName(save.getSkillName());
        response.setSkillLevel(String.valueOf(save.getSkillLevel()));

        return ResponseEntity.ok(response);
    }
}
