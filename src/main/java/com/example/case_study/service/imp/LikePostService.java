package com.example.case_study.service.imp;

import com.example.case_study.model.LikePost;
import com.example.case_study.repository.ILikePostRepository;
import com.example.case_study.service.ILikePostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class LikePostService implements ILikePostService {
    @Autowired
    ILikePostRepository iLikePostRepository;

    @Override
    public List<LikePost> findAll() {
        return iLikePostRepository.findAll();
    }

    @Override
    public LikePost save(LikePost likePost) {
        return iLikePostRepository.save(likePost);
    }

    @Override
    public void delete(Long id) {
        iLikePostRepository.deleteById(id);
    }
}
