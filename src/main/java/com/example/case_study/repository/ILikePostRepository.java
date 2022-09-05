package com.example.case_study.repository;

import com.example.case_study.model.Comments;
import com.example.case_study.model.LikePost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ILikePostRepository extends JpaRepository<LikePost,Long> {
}
