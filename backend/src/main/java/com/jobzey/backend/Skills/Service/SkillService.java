package com.jobzey.backend.Skills.Service;


import com.jobzey.backend.Skills.Model.SkillsModel;
import com.jobzey.backend.Skills.Repository.SkillsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillsRepository skillsRepo;

    public SkillService(SkillsRepository skillsRepo) {
        this.skillsRepo = skillsRepo;
    }

    public List<SkillsModel> getSkills(){
        return skillsRepo.findAll();
    }
}
