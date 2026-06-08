package com.jobzey.backend.ResumesSystem.Service;

import com.jobzey.backend.ResumesSystem.DTO.StoredFileInfo;
import com.jobzey.backend.ResumesSystem.Exceptions.EmptyFileException;
import com.jobzey.backend.ResumesSystem.Exceptions.FileDidNotExistsToDelete;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class LocalFileStorageService implements FileStorageService{

    @Value("${app.upload_dir}")
    public String uploadDir;

    @Override
    public StoredFileInfo uploadFile(MultipartFile file){
        if(file == null || file.isEmpty()){
            throw new EmptyFileException("File is Empty");
        }

        String originalFileName = file.getOriginalFilename();
        String mimiType = file.getContentType();
        Long fileSize = file.getSize();

        String extension="";

        if(originalFileName != null && originalFileName.contains(".")){
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }

        String storedFileName = UUID.randomUUID() + extension;

        try{
            Path dirPath = Paths.get(uploadDir);

            if(!Files.exists(dirPath)){
                Files.createDirectories(dirPath);
            }

            Path filePath = dirPath.resolve(storedFileName);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            String storagePath = "resumes/" + storedFileName;

            return new StoredFileInfo(
                    originalFileName,
                    storedFileName,
                    storagePath,
                    fileSize,
                    mimiType
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteFile(String fileUrl){
        try{
            String fileName = Path.of(fileUrl).getFileName().toString();
            Path Dir = Paths.get(uploadDir);
            Path FinalPath = Dir.resolve(fileName);
            Files.deleteIfExists(FinalPath);
        } catch (Exception e) {
            throw new FileDidNotExistsToDelete("File did not Exists to Delete");
        }
    }
}
