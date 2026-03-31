package com.jobzey.backend.AuthenticationSystem.dto;

import lombok.Data;

@Data
public class RecruiterRegisterRequestDto {

    private String firebaseUid;
    private String email;

    private String username;

}
