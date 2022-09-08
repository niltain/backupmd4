package com.example.case_study.service;

import com.example.case_study.model.Users;

import java.util.Optional;

public interface IUserService extends ICommon<Users>{
    Users checkUserExist(Users users);
    Users checkSignUp(Users users);

    Optional<Users> findById(Long id);
}
