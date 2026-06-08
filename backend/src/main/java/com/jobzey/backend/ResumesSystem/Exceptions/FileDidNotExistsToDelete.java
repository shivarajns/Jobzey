package com.jobzey.backend.ResumesSystem.Exceptions;

public class FileDidNotExistsToDelete extends RuntimeException {
    public FileDidNotExistsToDelete(String message) {
        super(message);
    }
}
