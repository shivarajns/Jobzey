package com.jobzey.backend.Skills.Controller;

import com.jobzey.backend.Skills.Model.SkillsModel;
import com.jobzey.backend.Skills.Service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SkillsController {

    private final SkillService skillService;

    public SkillsController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping("/skills")
    public ResponseEntity<List<SkillsModel>> getAllSkills(){
        List<SkillsModel> skills = skillService.getSkills();
        return ResponseEntity.ok(skills);
    }
}
