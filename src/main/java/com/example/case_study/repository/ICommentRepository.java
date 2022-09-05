package com.example.case_study.repository;

import com.example.case_study.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICommentRepository extends JpaRepository<Comments,Long> {
}
