package com.example.case_study.service;

import com.example.case_study.model.LikePost;
import com.example.case_study.model.Users;

import java.util.Optional;

public interface ILikePostService extends ICommon<LikePost>{
    Optional<LikePost> findById(Long id);
}
