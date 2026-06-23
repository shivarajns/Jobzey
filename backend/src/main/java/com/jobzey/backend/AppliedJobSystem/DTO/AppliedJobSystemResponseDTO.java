package com.jobzey.backend.AppliedJobSystem.DTO;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AppliedJobSystemResponseDTO {
    private Long id;
    private int jobId;
    private int jobseekerId;
    private String jobTitle;
    private LocalDateTime appliedAt;
    private String status;
}
