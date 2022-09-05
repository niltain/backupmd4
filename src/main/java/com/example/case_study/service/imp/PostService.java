package com.example.case_study.service.imp;

import com.example.case_study.model.Posts;
import com.example.case_study.repository.IPostRepository;
import com.example.case_study.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PostService implements IPostService {
    @Autowired
    IPostRepository iPostRepository;

    @Override
    public List<Posts> findAll() {
        return iPostRepository.findAll();
    }

    @Override
    public Posts save(Posts posts) {
        return iPostRepository.save(posts);
    }

    @Override
    public void delete(Long id) {
        iPostRepository.deleteById(id);
    }
}
