package com.jobzey.backend.jobseekerSkills.Controller;

import com.jobzey.backend.jobseekerSkills.DTO.JobseekerSkillsAddRequest;
import com.jobzey.backend.jobseekerSkills.DTO.JobseekerSkillsAddResponse;
import com.jobzey.backend.jobseekerSkills.DTO.JobseekerSkillsGetRequest;
import com.jobzey.backend.jobseekerSkills.DTO.JobseekerSkillsGetResponse;
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
    public ResponseEntity<JobseekerSkillsAddResponse> createJobseekerSkill(
            @RequestBody JobseekerSkillsAddRequest request
            ) {

        JobseekerSkillsModel save = skillsService.createJobseekerSkills(request);

        JobseekerSkillsAddResponse response = new JobseekerSkillsAddResponse();

        response.setMessage("Skills saved Successfully");
        response.setSkillId(save.getSkillId());
        response.setId(save.getId());
        response.setUserId(save.getUserId());
        response.setSkillName(save.getSkillName());
        response.setSkillLevel(String.valueOf(save.getSkillLevel()));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/get")
    public ResponseEntity<JobseekerSkillsGetResponse> getSkill(
            @RequestBody JobseekerSkillsGetRequest request
    ) {
        JobseekerSkillsGetResponse response = skillsService.getSkills(request);

        return ResponseEntity.ok(response);

    }

}
