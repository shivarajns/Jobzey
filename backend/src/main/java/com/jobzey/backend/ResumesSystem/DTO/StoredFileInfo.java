package com.jobzey.backend.ResumesSystem.DTO;

public record StoredFileInfo(
        String originalFileName,
        String storedFileName,
        String fileUrl,
        Long fileSize,
        String mimiType
) {
}