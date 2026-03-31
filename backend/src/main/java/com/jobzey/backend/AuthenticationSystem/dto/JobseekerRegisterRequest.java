package com.jobzey.backend.AuthenticationSystem.dto;

import lombok.Data;

@Data
public class JobseekerRegisterRequest {

    private String firebaseUid;
    private String email;

    private String username;
    private String phone;

    private String fullName;

}
