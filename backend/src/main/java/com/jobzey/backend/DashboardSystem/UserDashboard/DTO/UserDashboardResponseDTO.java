package com.jobzey.backend.DashboardSystem.UserDashboard.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class UserDashboardResponseDTO {

    private String message;
    private String email;
    private String username;
    private String phone;
    private String role;


}
