package com.example.case_study.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private Long likeCount = 0L;
    private Boolean deleteComment = true;
    @ManyToOne
    private Posts posts;
    @ManyToOne
    private Users users;
    @ManyToOne
    private Comments parentComment;
}
