package com.jobzey.backend.DashboardSystem.UserDashboard.ExceptionHandling;

public class ProfileNotFoundException extends RuntimeException {
    public ProfileNotFoundException(String message) {
        super(message);
    }
}
