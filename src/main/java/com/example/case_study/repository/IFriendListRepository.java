package com.example.case_study.repository;

import com.example.case_study.model.Comments;
import com.example.case_study.model.FriendList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFriendListRepository extends JpaRepository<FriendList,Long> {
}
