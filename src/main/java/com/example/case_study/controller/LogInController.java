package com.example.case_study.controller;

import com.example.case_study.model.Users;
import com.example.case_study.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/logIn")
public class LogInController {
    @Autowired
    IUserService iUserService;
//    @GetMapping("/getUser")
//    public ResponseEntity<List<Users>> findAllUser() {
//        return new ResponseEntity<>(iUserService.findAll(), HttpStatus.OK);
//    }

    @PostMapping("/logIn")
    public ResponseEntity<Users> logIn(@RequestBody Users users) {
        Users users1 = iUserService.checkUserExist(users);
        if (users1 != null) {
            return new ResponseEntity<>(users1, HttpStatus.OK);
        } else {
            return null;
        }
    }
}
