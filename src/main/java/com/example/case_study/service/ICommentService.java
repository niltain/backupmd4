package com.example.case_study.service;

import com.example.case_study.model.Comments;

import java.util.Optional;

public interface ICommentService extends ICommon<Comments>{
    Optional<Comments> findById(Long id);
}
