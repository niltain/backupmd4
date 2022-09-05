package com.example.case_study.repository;

import com.example.case_study.model.Comments;
import com.example.case_study.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface INotificationRepository extends JpaRepository<Notification,Long> {
}
