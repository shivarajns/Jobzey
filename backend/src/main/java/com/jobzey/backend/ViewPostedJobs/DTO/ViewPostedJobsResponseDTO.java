package com.jobzey.backend.ViewPostedJobs.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ViewPostedJobsResponseDTO {
    private int jobId;
}
