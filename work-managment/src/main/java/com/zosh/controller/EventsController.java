package com.zosh.controller;

import com.zosh.model.Events;
import com.zosh.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EventsController {

    @Autowired
    private EventService eventsService;

    @PostMapping("/admin/events")
    public ResponseEntity<Events> createEvent(@RequestBody Events event) {
        Events savedEvent = eventsService.saveEvent(event);
        return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<Events> getEventById(@PathVariable Long id) throws Exception {
        Events event = eventsService.getEventById(id);
        return ResponseEntity.ok(event);
    }

    @GetMapping("/events")
    public ResponseEntity<List<Events>> getAllEvents(@RequestParam(required = false) String city) {
        List<Events> events = eventsService.getAllEvents(city);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/events/company/{id}")
    public ResponseEntity<List<Events>> getEventsByCompanyId(
            @PathVariable Long id,
            @RequestParam(required = false) String city) {
        List<Events> events = eventsService.getEventsByCompanyId(id);
        return ResponseEntity.ok(events);
    }

    @PutMapping("/admin/events/{id}")
    public ResponseEntity<Events> updateEvent(@PathVariable Long id,
                                              @RequestBody Events event) throws Exception {
        Events updatedEvent = eventsService.updateEvent(id, event);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/admin/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventsService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}
