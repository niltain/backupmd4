package com.example.case_study.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FriendList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String statusRequestTo = "Add Friend";
    private String statusRequestFrom = "Add Friend";
    @ManyToOne
    private Users usersTo;
    @ManyToOne
    private Users usersFrom;
}
