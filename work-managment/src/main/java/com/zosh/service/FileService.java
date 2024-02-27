package com.zosh.service;

import com.zosh.domain.TYPE;
import com.zosh.model.Company;
import com.zosh.model.Files;
import com.zosh.model.User;
import com.zosh.request.FileRequest;

import java.util.List;

public interface FileService {
    Files saveFiles(String name,
                    String description,
                    String file,
                    TYPE type,
                    User supporter,
                    User assignedWorker, Company company);
    Files getFilesById(Long id) throws Exception;
    List<Files> getAllFiles(TYPE type);
    Files updateFiles(Long id, FileRequest files) throws Exception;
    void deleteFiles(Long id);
    List<Files> findFilesByCompanyId(Long companyId);


}
