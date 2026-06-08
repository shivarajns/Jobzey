package com.jobzey.backend.ResumesSystem.Service;

import com.jobzey.backend.ResumesSystem.DTO.StoredFileInfo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    StoredFileInfo uploadFile(MultipartFile file);
    void deleteFile(String fileUrl);
}
