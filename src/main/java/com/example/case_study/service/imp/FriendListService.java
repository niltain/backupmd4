package com.example.case_study.service.imp;

import com.example.case_study.model.FriendList;
import com.example.case_study.repository.IFriendListRepository;
import com.example.case_study.service.IFriendListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendListService implements IFriendListService {
    @Autowired
    IFriendListRepository iFriendListRepository;

    @Override
    public List<FriendList> findAll() {
        return iFriendListRepository.findAll();
    }

    @Override
    public FriendList save(FriendList friendList) {
        return iFriendListRepository.save(friendList);
    }

    @Override
    public void delete(Long id) {
        iFriendListRepository.deleteById(id);
    }
}
