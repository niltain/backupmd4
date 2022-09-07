package com.example.case_study.controller;

import com.example.case_study.model.Comments;
import com.example.case_study.model.LikePost;
import com.example.case_study.model.Posts;
import com.example.case_study.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    ICommentService iCommentService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Comments>> findAll() {
        return new ResponseEntity<>(iCommentService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Comments> comment(@RequestBody Comments comments) {
        Comments comments1 = iCommentService.save(comments);
        return new ResponseEntity<>(comments1, HttpStatus.CREATED);
    }

    @PutMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        Optional<Comments> comments = iCommentService.findById(id);
        if (comments.isPresent()) {
            comments.get().setDeleteComment(false);
            iCommentService.save(comments.get());
        }
    }
}
