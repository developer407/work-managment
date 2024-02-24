package com.zosh.controller;

import com.zosh.domain.TYPE;
import com.zosh.model.Company;
import com.zosh.model.Files;
import com.zosh.model.User;
import com.zosh.request.FileRequest;
import com.zosh.service.CompanyService;
import com.zosh.service.FileService;
import com.zosh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FilesController {

    @Autowired
    private FileService filesService;

    @Autowired
    private UserService userService;

    @Autowired
    private CompanyService companyService;

    @PostMapping("/admin/files")
    public ResponseEntity<Files> createFiles(@RequestBody FileRequest req) throws Exception {
        User supporter = userService.findUserById(req.getSupporterId());
        User assignedWorker=userService.findUserById(req.getAssignedWorkerId());
        Company company=companyService.getCompanyById(req.getCompanyId());

        Files savedFiles = filesService.saveFiles(req.getName(),
                req.getType(),supporter,assignedWorker,company);
        return new ResponseEntity<>(savedFiles, HttpStatus.CREATED);
    }

    @GetMapping("/files/{id}")
    public ResponseEntity<Files> getFilesById(@PathVariable Long id) throws Exception {
        Files files = filesService.getFilesById(id);
        return ResponseEntity.ok(files);
    }

    @GetMapping("/files")
    public ResponseEntity<List<Files>> getAllFiles(@RequestParam(required = false) TYPE type) {
        List<Files> files = filesService.getAllFiles(type);
        return ResponseEntity.ok(files);
    }

    @PutMapping("/admin/files/{id}")
    public ResponseEntity<Files> updateFiles(@PathVariable Long id, @RequestBody Files files) throws Exception {
        Files updatedFiles = filesService.updateFiles(id, files);
        return ResponseEntity.ok(updatedFiles);
    }

    @DeleteMapping("/admin/files/{id}")
    public ResponseEntity<Void> deleteFiles(@PathVariable Long id) {
        filesService.deleteFiles(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/files/company/{companyId}")
    public ResponseEntity<List<Files>> findFilesByCompanyId(@PathVariable Long companyId) {
        List<Files> files = filesService.findFilesByCompanyId(companyId);
        return ResponseEntity.ok(files);
    }
}
