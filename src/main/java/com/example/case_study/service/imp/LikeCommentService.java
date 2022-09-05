package com.example.case_study.service.imp;

import com.example.case_study.model.LikeComment;
import com.example.case_study.repository.ILikeCommentRepository;
import com.example.case_study.service.ILikeCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class LikeCommentService implements ILikeCommentService {
    @Autowired
    ILikeCommentRepository iLikeCommentRepository;

    @Override
    public List<LikeComment> findAll() {
        return iLikeCommentRepository.findAll();
    }

    @Override
    public LikeComment save(LikeComment likeComment) {
        return iLikeCommentRepository.save(likeComment);
    }

    @Override
    public void delete(Long id) {
        iLikeCommentRepository.deleteById(id);
    }
}
