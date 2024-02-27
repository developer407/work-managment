package com.zosh.service;

import com.zosh.model.Tools;
import com.zosh.repository.ToolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToolServiceImpl implements ToolService{

    @Autowired
    private ToolRepository toolsRepository;

    @Override
    public Tools saveTool(Tools tool) {
        return toolsRepository.save(tool);
    }

    @Override
    public Tools getToolById(Long id) throws Exception {
        return toolsRepository.findById(id)
                .orElseThrow(() -> new Exception("Tool not found with id: " + id));
    }

    @Override
    public List<Tools> getAllTools() {
        return toolsRepository.findAll();
    }

    @Override
    public Tools updateTool(Long id, Tools tool) throws Exception {
        Tools existingTool = getToolById(id);
        existingTool.setName(tool.getName());
        existingTool.setDescription(tool.getDescription());
        existingTool.setLogo(tool.getLogo());
        return toolsRepository.save(existingTool);
    }

    @Override
    public void deleteTool(Long id) {
        toolsRepository.deleteById(id);
    }
}
