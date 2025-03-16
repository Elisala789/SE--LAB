package com.example.demo.service;

import com.example.demo.model.Lab;
import com.example.demo.repository.LabRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LabService {
    private final LabRepository labRepository;

    public LabService(LabRepository labRepository) {
        this.labRepository = labRepository;
    }

    public List<Lab> getAllLabs() {
        return labRepository.findAll();
    }

    public Lab addLab(String name, int servers,String location,String operating_hours,int ram,int processors) {
        Lab lab = new Lab();
        lab.setName(name);
        lab.setServers(servers);
        lab.setLocation(location);
        lab.setOperating_hours(operating_hours);
        lab.setRam(ram);
        lab.setProcessors(processors);
        return labRepository.save(lab);
    }

    public boolean removeLab(Long id) {
        if (labRepository.existsById(id)) {
            labRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public Optional<Lab> getLabById(Long id) {
        return labRepository.findById(id);
    }

    public Lab saveLab(Lab lab) {
        return labRepository.save(lab);
    }

    
}