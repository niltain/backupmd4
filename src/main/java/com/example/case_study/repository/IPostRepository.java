package com.example.case_study.repository;

import com.example.case_study.model.Comments;
import com.example.case_study.model.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IPostRepository extends JpaRepository<Posts, Long> {
    @Query(value = "select * from Posts where delete_post = true ", nativeQuery = true)
    List<Posts> findAllCustom();
}
