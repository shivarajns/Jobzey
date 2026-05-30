package com.jobzey.backend.JobApplicationSystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobApplicationRequestDTO {

    private Long jobId;
    private int jobseekerId;
    private String resumeURL;
    private String currentStatus;

}
