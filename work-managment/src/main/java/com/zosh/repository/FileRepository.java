package com.zosh.repository;

import com.zosh.model.Files;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileRepository extends JpaRepository<Files,Long> {

    List<Files> findByCompanyId(Long id);
}
