package com.zosh.request;

import com.zosh.domain.TYPE;
import com.zosh.model.Company;
import com.zosh.model.User;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FileRequest {
    private String name;

    private Long companyId;

    private Long assignedWorkerId;

    private Long supporterId;

    private TYPE type;

    private String description;
    private String file;

}
