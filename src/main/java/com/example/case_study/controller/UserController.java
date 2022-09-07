package com.example.case_study.controller;

import com.example.case_study.model.Posts;
import com.example.case_study.model.Users;
import com.example.case_study.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {
    @Autowired
    IUserService iUserService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Users>> findAll() {
        return new ResponseEntity<>(iUserService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Users> findById(@PathVariable Long id) {
        Optional<Users> users = iUserService.findById(id);
        if (users.isPresent()) {
            return new ResponseEntity<>(users.get(), HttpStatus.OK);
        }
        return null;
    }
    @PutMapping("/block/{id}")
    public void blockUser(@PathVariable Long id) {
        Optional<Users> users = iUserService.findById(id);
        if (users.isPresent()) {
            users.get().setBlockUser(false);
            iUserService.save(users.get());
        }
    }
}
