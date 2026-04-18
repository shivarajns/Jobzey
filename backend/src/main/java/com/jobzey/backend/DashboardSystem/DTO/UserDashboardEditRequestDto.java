package com.jobzey.backend.DashboardSystem.UserDashboard.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDashboardEditRequestDto {
    private String username;
    private String phone;
}
