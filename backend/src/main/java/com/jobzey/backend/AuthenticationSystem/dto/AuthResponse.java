package com.jobzey.backend.AuthenticationSystem.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String message;
    private boolean success;
    private String role;
    private int userId;
    private String email;
    private String userName;
}
