package com.example.case_study.controller;

import com.example.case_study.model.LikePost;
import com.example.case_study.model.Posts;
import com.example.case_study.model.Users;
import com.example.case_study.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/post")
public class PostController {
    @Autowired
    IPostService iPostService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Posts>> findAll() {
        return new ResponseEntity<>(iPostService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Posts> create(@RequestBody Posts posts) {
        Posts posts1 = iPostService.save(posts);
        return new ResponseEntity<>(posts1, HttpStatus.CREATED);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Posts> findById(@PathVariable Long id) {
        Optional<Posts> posts = iPostService.findById(id);
        if (posts.isPresent()) {
            return new ResponseEntity<>(posts.get(), HttpStatus.OK);
        }
        return null;
    }

    @PutMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        Optional<Posts> posts = iPostService.findById(id);
        if (posts.isPresent()) {
            posts.get().setDeletePost(false);
            iPostService.save(posts.get());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Posts> update(@RequestBody Posts posts) {
        Optional<Posts> posts1 = iPostService.findById(posts.getId());
        if (posts1.isPresent()) {
            posts1.get().setPermissionPost(posts.getPermissionPost());
            posts1.get().setContent(posts.getContent());
            posts1.get().setImageName(posts.getImageName());
            return new ResponseEntity<>(iPostService.save(posts1.get()), HttpStatus.CREATED);
        }
        return null;
    }
}

