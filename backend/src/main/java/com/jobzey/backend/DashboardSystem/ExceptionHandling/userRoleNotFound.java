package com.jobzey.backend.DashboardSystem.UserDashboard.ExceptionHandling;

public class userRoleNotFound extends RuntimeException {
    public userRoleNotFound(String message) {
        super(message);
    }
}
