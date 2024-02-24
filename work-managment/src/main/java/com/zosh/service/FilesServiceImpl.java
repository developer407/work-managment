package com.zosh.service;

import com.zosh.domain.TYPE;
import com.zosh.model.Company;
import com.zosh.model.Files;
import com.zosh.model.User;
import com.zosh.repository.FileRepository;
import com.zosh.request.FileRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class FilesServiceImpl implements FileService {

    @Autowired
    private FileRepository filesRepository;


    @Override
    public Files saveFiles(String name, TYPE type,
                           User supporter,
                           User assignedWorker,
                           Company company) {
        Files files=new Files();
        files.setName(name);
        files.setType(type);
        files.setSupport(supporter);
        files.setCompany(company);
        files.setAssignedWorker(assignedWorker);
        files.setCreatedAt(LocalDateTime.now());
        return filesRepository.save(files);
    }

    @Override
    public Files getFilesById(Long id) throws Exception {
        return filesRepository.findById(id)
                .orElseThrow(() -> new Exception("Files not found with id: " + id));
    }

    @Override
    public List<Files> getAllFiles(TYPE type) {
        Stream<Files> filesStream = filesRepository.findAll().stream();

        if (type != null) {
            filesStream = filesStream.filter(files -> files.getType() == type);
        }

        return filesStream.collect(Collectors.toList());
    }

    @Override
    public Files updateFiles(Long id, Files files) throws Exception {
        Files existingFiles = getFilesById(id);
        existingFiles.setName(files.getName());
        existingFiles.setCompany(files.getCompany());
        existingFiles.setAssignedWorker(files.getAssignedWorker());
        existingFiles.setSupport(files.getSupport());
        existingFiles.setType(files.getType());
        existingFiles.setCreatedAt(files.getCreatedAt());
        return filesRepository.save(existingFiles);
    }

    @Override
    public void deleteFiles(Long id) {
        filesRepository.deleteById(id);
    }

    @Override
    public List<Files> findFilesByCompanyId(Long companyId) {
        return filesRepository.findByCompanyId(companyId);
    }

}
