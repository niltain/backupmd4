package com.example.case_study.service.imp;

import com.example.case_study.model.Notification;
import com.example.case_study.repository.INotificationRepository;
import com.example.case_study.service.INotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class NotificationService implements INotificationService {
    @Autowired
    INotificationRepository iNotificationRepository;

    @Override
    public List<Notification> findAll() {
        return iNotificationRepository.findAll();
    }

    @Override
    public Notification save(Notification notification) {
        return iNotificationRepository.save(notification);
    }

    @Override
    public void delete(Long id) {
        iNotificationRepository.deleteById(id);
    }
}
