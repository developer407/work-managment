package com.zosh.controller;

import com.zosh.model.Tools;
import com.zosh.service.ToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ToolController {
    @Autowired
    private ToolService toolsService;

    @PostMapping("/admin")
    public ResponseEntity<Tools> createTool(@RequestBody Tools tool) {
        Tools savedTool = toolsService.saveTool(tool);
        return new ResponseEntity<>(savedTool, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tools> getToolById(@PathVariable Long id) throws Exception {
        Tools tool = toolsService.getToolById(id);
        return ResponseEntity.ok(tool);
    }

    @GetMapping
    public ResponseEntity<List<Tools>> getAllTools() {
        List<Tools> tools = toolsService.getAllTools();
        return ResponseEntity.ok(tools);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<Tools> updateTool(@PathVariable Long id, @RequestBody Tools tool) throws Exception {
        Tools updatedTool = toolsService.updateTool(id, tool);
        return ResponseEntity.ok(updatedTool);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteTool(@PathVariable Long id) {
        toolsService.deleteTool(id);
        return ResponseEntity.noContent().build();
    }
}
