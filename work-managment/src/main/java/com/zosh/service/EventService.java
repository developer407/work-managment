package com.zosh.service;

import com.zosh.model.Events;

import java.util.List;

public interface EventService {
    Events saveEvent(Events event);
    Events getEventById(Long id) throws Exception;
    List<Events> getAllEvents(String city);
    List<Events> getEventsByCompanyId(Long companyId);
    Events updateEvent(Long id, Events event) throws Exception;
    void deleteEvent(Long id);


}
