package com.example.case_study.controller;

import com.example.case_study.model.LikePost;
import com.example.case_study.model.Posts;
import com.example.case_study.service.ILikePostService;
import com.example.case_study.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/likePost")
public class LikePostController {
    @Autowired
    IPostService iPostService;
    @Autowired
    ILikePostService iLikePostService;

    @GetMapping("/findAll")
    public ResponseEntity<List<LikePost>> findAll() {
        return new ResponseEntity<>(iLikePostService.findAll(), HttpStatus.OK);
    }


    @PostMapping("/create")
    public void likePost(@RequestBody LikePost likePost) {
        LikePost likePost1 = iLikePostService.save(likePost);
        Long idPost = likePost1.getPost().getId();
        Optional<Posts> posts = iPostService.findById(idPost);
        if (posts.isPresent()) {
            Long presentLike = posts.get().getLikeCount();
            posts.get().setLikeCount(presentLike + 1);
            iPostService.save(posts.get());
        }
    }

    @DeleteMapping("/disLike/{id}")
    public void disLikePost(@PathVariable Long id) {
        Optional<LikePost> likePost = iLikePostService.findById(id);
        if (likePost.isPresent()) {
            Long idPost = likePost.get().getPost().getId();
            Optional<Posts> posts = iPostService.findById(idPost);
            if (posts.isPresent()) {
                Long presentLike = posts.get().getLikeCount();
                posts.get().setLikeCount(presentLike - 1);
                iPostService.save(posts.get());
            }
        }
        iLikePostService.delete(id);
    }
}

