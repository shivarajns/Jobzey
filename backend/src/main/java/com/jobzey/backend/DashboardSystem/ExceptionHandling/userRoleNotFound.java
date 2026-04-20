package com.jobzey.backend.DashboardSystem.ExceptionHandling;

public class userRoleNotFound extends RuntimeException {
    public userRoleNotFound(String message) {
        super(message);
    }
}
