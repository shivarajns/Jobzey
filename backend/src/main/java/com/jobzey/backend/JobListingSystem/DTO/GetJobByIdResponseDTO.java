package com.jobzey.backend.JobListingSystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetJobByIdResponseDTO {
    private String title;
    private String Description;
}
