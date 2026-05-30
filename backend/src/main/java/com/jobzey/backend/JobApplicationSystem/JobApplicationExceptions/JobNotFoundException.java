package com.jobzey.backend.JobApplicationSystem.JobApplicationExceptions;

public class JobNotFoundException extends RuntimeException {
    public JobNotFoundException(String message) {
        super(message);
    }
}
