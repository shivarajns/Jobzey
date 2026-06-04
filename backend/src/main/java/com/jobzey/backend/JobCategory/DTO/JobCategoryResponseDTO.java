package com.jobzey.backend.JobCategory.DTO;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class JobCategoryResponseDTO {
    private int id;
    private String categoryName;
}
