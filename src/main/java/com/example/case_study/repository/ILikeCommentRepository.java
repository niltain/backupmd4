package com.example.case_study.repository;

import com.example.case_study.model.Comments;
import com.example.case_study.model.LikeComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ILikeCommentRepository extends JpaRepository<LikeComment,Long> {
}
