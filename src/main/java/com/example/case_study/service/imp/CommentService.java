package com.example.case_study.service.imp;

import com.example.case_study.model.Comments;
import com.example.case_study.repository.ICommentRepository;
import com.example.case_study.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService implements ICommentService {
    @Autowired
    ICommentRepository iCommentRepository;

    @Override
    public List<Comments> findAll() {
        return iCommentRepository.findAll();
    }

    @Override
    public Comments save(Comments comments) {
        return iCommentRepository.save(comments);
    }

    @Override
    public void delete(Long id) {
        iCommentRepository.deleteById(id);
    }
}
