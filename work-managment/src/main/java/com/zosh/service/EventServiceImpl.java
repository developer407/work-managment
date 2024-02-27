package com.zosh.service;

import com.zosh.model.Events;
import com.zosh.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {
    @Autowired
    private EventRepository eventsRepository;

    @Override
    public Events saveEvent(Events event) {

        return eventsRepository.save(event);
    }

    @Override
    public Events getEventById(Long id) throws Exception {
        return eventsRepository.findById(id)
                .orElseThrow(() -> new Exception("Event not found with id: " + id));
    }



    @Override
    public List<Events> getEventsByCompanyId(Long companyId) {
        return eventsRepository.findByCompanyId(companyId);
    }

    @Override
    public List<Events> getAllEvents(String city) {
        List<Events>events=eventsRepository.findAll();
        if(city!=null){
            events=events.stream()
                    .filter(event->event.getCity().toLowerCase().contains(city.toLowerCase())
                    || event.getCompany().getAddress().toLowerCase().contains(city.toLowerCase()))
                    .collect(Collectors.toList());
        }
        return events;
    }

    @Override
    public Events updateEvent(Long id, Events event) throws Exception {
        Events existingEvent = getEventById(id);
        existingEvent.setName(event.getName());
        existingEvent.setCompany(event.getCompany());
        existingEvent.setDate(event.getDate());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setCity(event.getCity());
        return eventsRepository.save(existingEvent);
    }

    @Override
    public void deleteEvent(Long id) {
        eventsRepository.deleteById(id);
    }
}

