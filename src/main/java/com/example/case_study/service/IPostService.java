package com.example.case_study.service;

import com.example.case_study.model.Posts;
import com.example.case_study.model.Users;

import java.util.Optional;

public interface IPostService extends ICommon<Posts>{
    Optional<Posts> findById(Long id);
}
