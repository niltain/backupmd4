package com.example.case_study.service.imp;

import com.example.case_study.model.Users;
import com.example.case_study.repository.IUserRepository;
import com.example.case_study.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    IUserRepository iUserRepository;

    @Override
    public List<Users> findAll() {
        return iUserRepository.findAll();
    }

    @Override
    public Users save(Users users) {
        return iUserRepository.save(users);
    }

    @Override
    public void delete(Long id) {
        iUserRepository.deleteById(id);
    }

    @Override
    public Users checkUserExist(Users users) {
        for (Users u : findAll()) {
            if (u.getBlockUser() && u.getUserName().equals(users.getUserName()) && u.getPass().equals(users.getPass())) {
                return u;
            }
        }
        return null;
    }

    @Override
    public Users checkSignUp(Users users) {
        for (Users u : findAll()) {
            if (u.getUserName().equals(users.getUserName())) {
                return null;
            }
        }
        return users;
    }

    @Override
    public Optional<Users> findById(Long id) {
        return iUserRepository.findById(id);
    }
}
