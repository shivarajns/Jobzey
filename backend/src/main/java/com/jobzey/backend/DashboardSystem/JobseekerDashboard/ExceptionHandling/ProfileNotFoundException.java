package com.jobzey.backend.DashboardSystem.JobseekerDashboard.ExceptionHandling;

public class ProfileNotFoundException extends RuntimeException {
    public ProfileNotFoundException(String message) {
        super(message);
    }
}
