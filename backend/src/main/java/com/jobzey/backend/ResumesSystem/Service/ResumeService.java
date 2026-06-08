package com.jobzey.backend.ResumesSystem.Service;

import com.jobzey.backend.ResumesSystem.DTO.StoredFileInfo;
import com.jobzey.backend.ResumesSystem.Model.ResumesModel;
import com.jobzey.backend.ResumesSystem.Repository.ResumesRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public class ResumeService {
    private final ResumesRepository resumesRepository;
    private final LocalFileStorageService fileStorageService;
    public ResumeService(ResumesRepository resumesRepository, LocalFileStorageService fileStorageService) {
        this.resumesRepository = resumesRepository;
        this.fileStorageService = fileStorageService;
    }

    public void uploadResume(int userId, MultipartFile file){

        StoredFileInfo fileInfo  = fileStorageService.uploadFile(file);

        Optional<ResumesModel> isResumeExists = resumesRepository.findByUserId(userId);

        if(isResumeExists.isPresent()){
            ResumesModel existing = isResumeExists.get();

            fileStorageService.deleteFile(existing.getFileUrl());
            existing.setOriginalFileName(fileInfo.originalFileName());
            existing.setStoredFileName(fileInfo.storedFileName());
            existing.setFileSize(fileInfo.fileSize());
            existing.setMimiType(fileInfo.mimiType());
            existing.setFileUrl(fileInfo.fileUrl());
            resumesRepository.save(existing);
            return;
        }

        ResumesModel resume = ResumesModel.builder()
                .userId(userId)
                .originalFileName(fileInfo.originalFileName())
                .storedFileName(fileInfo.storedFileName())
                .fileUrl(fileInfo.fileUrl())
                .fileSize(fileInfo.fileSize())
                .mimiType(fileInfo.mimiType())
                .build();

        resumesRepository.save(resume);
    }
}
