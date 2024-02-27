package com.zosh.service;

import com.zosh.model.Tools;

import java.util.List;

public interface ToolService {
    Tools saveTool(Tools tool);
    Tools getToolById(Long id) throws Exception;
    List<Tools> getAllTools();
    Tools updateTool(Long id, Tools tool) throws Exception;
    void deleteTool(Long id);
}
